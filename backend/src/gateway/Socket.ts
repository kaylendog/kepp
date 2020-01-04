import { EventEmitter } from "events";
import { Handler } from "express";
import { IncomingMessage } from "http";
import WebSocket from "ws";

import { ObjectFromSchema, validateObject } from "../config/validation";
import { SnepServer } from "./";
import { ErrorCodes } from "./events";
import { IncomingSocketHandlers } from "./events/incoming";
import { IncomingEvents, IncomingSocketMessage } from "./events/incoming/types";
import { OutgoingEventCreators } from "./events/outgoing";
import { OutgoingEvents, OutgoingSocketMessage } from "./events/outgoing/types";

/**
 * Enum of Socket event names.
 */
export const enum SocketEvents {
	Close = "close",
	Outgoing = "outgoing",
	Incoming = "incoming",
}

/**
 * Represents a socket connection.
 */
export class Socket extends EventEmitter {
	public connection = this.incomingMessage;
	public logger = this.server.logger;

	public authorized = false;
	public isBot = false;

	// Class vars
	private authTimeout = setTimeout(() => this._handleAuthTimeout(), 10e3);

	constructor(
		readonly server: SnepServer,
		readonly ws: WebSocket,
		readonly incomingMessage: IncomingMessage,
	) {
		super();
		this.ws
			.on("message", (data) => this._handleMsg(data))
			.on("close", (err) =>
				this.logger.info(
					`[${this.addr}] Socket closed - ${ErrorCodes[err]} (${err})`,
				),
			);

		this.logger.info(
			`[${this.addr}] New connection - waiting for authorization request...`,
		);

		this.on(SocketEvents.Outgoing, (ev) =>
			this.logger.debug(
				`[${this.addr}][outgoing] ${OutgoingEvents[ev.op]} (${
					ev.op
				}) - len: ${JSON.stringify(ev).toString().length}`,
			),
		);

		this.on(SocketEvents.Incoming, (ev) =>
			this.logger.debug(
				`[${this.addr}][incoming] ${IncomingEvents[ev.op]} (${
					ev.op
				}) - len: ${JSON.stringify(ev).toString().length}`,
			),
		);
	}

	/**
	 * Get the socket address.
	 */
	get addr() {
		const connection = this.incomingMessage.connection;
		return `${connection.remoteAddress}:${connection.remotePort}/${connection.remoteFamily}`;
	}

	/**
	 * Get whether the socket is open.
	 * @param event
	 */
	get open() {
		return this.ws.readyState === WebSocket.OPEN;
	}

	/**
	 * Send an event to the client.
	 * @param event
	 */
	send(event: OutgoingSocketMessage<any>): this {
		this.ws.send(JSON.stringify(event));
		this.emit(SocketEvents.Outgoing, event);

		return this;
	}

	/**
	 * Fire an event by executing its respective event creator.
	 * @param op
	 * @param args
	 */
	fire(op: OutgoingEvents, args: {}) {
		const handler = OutgoingEventCreators.get(op);
		if (!handler) {
			throw Error("Cannot fire event with unrecognised Opcode: " + op);
		} else {
			handler.handler(this, args);
		}
	}

	/**
	 * Close the socket connection.
	 * @param code
	 */
	close(code: ErrorCodes): this {
		this.ws.close(code);
		this.emit(SocketEvents.Close, code);

		return this;
	}

	/**
	 * Authorize the socket connection.
	 */
	public authorize(isBot = false) {
		if (this.authorized) {
			this.logger.warn(
				`[${this.addr}] Socket already authorized - closing...`,
			);
			return this.close(ErrorCodes.ALREAY_AUTHORIZED);
		}

		this.authorized = true;

		this.logger.info(
			`[${this.addr}] Socket authorized - informing client...`,
		);

		if (isBot) {
			this.logger.info(`[${this.addr}] Connected to nyawesome <3`);
			isBot = true;
			this.server.botSocket = this;
		}

		this.send({ op: OutgoingEvents.HELLO, d: {} });

		clearTimeout(this.authTimeout);
	}

	/**
	 * Handle a message from the client.
	 * @param data
	 */
	private _handleMsg(raw: WebSocket.Data) {
		let data: IncomingSocketMessage<any> | undefined;

		try {
			data = JSON.parse(raw.toString());
		} catch (err) {
			this.logger.warn(
				`[${this.addr}] Error while parsing socket message.`,
			);
			this.logger.warn(err.message);
		}

		if (!data) {
			return;
		}

		const handler = IncomingSocketHandlers.get(data.op);
		if (!handler) {
			this.logger.error(`[${this.addr}] Unknown Opcode: ${data.op}`);
			return this.close(ErrorCodes.UNKNOWN_OPCODE);
		}

		let validation = handler.validationSchema
			? validateObject(
					handler.validationSchema,
					data.d as ObjectFromSchema<any>,
			  )
			: null;

		if (validation && !validation.valid) {
			this.logger.error(
				`[${this.addr}] INVALID PAYLOAD - ${validation.missingEntries.length} missing fields (${validation.missingEntries})`,
			);
			this.logger.error(
				`[${this.addr}] INVALID PAYLOAD - ${validation.invalidTypes.length} invalid fields (${validation.invalidTypes})`,
			);
			return this.close(ErrorCodes.UNKNOWN_OPCODE);
		}

		handler.handler(this, data.d);
		this.emit(SocketEvents.Incoming, data);
	}

	/**
	 * Handle the authorization timeout
	 */
	private _handleAuthTimeout() {
		if (this.authorized || !this.open) {
			return;
		}

		this.logger.info(`[${this.addr}] Did not authorize - closing...`);
		this.close(ErrorCodes.AUTHORIZATION_TIMEOUT);
	}
}

export interface Socket extends EventEmitter {
	on(
		eventName: SocketEvents.Close,
		listener: (code: ErrorCodes) => any,
	): this;

	on(
		eventName: SocketEvents.Incoming,
		listener: (data: IncomingSocketMessage<any>) => any,
	): this;

	on(
		eventName: SocketEvents.Outgoing,
		listener: (data: OutgoingSocketMessage<any>) => any,
	): this;

	emit(eventName: SocketEvents, ...args: any[]): boolean;
}
