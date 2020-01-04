import { IncomingMessage } from "http";
import WebSocket from "ws";
import { env } from "~/env";

import { KeppAPI } from "../KeppAPI";
import { createLogger } from "../util/logging";
import { OutgoingSocketMessage } from "./events/outgoing/types";
import { Socket, SocketEvents } from "./Socket";

interface FoxServerConfig {
	port: number;
}

const DEFAULT_SERVER_CONFIG: FoxServerConfig = {
	port: env.WS_PORT,
};

/**
 * Socket server for communicating with the bot.
 */
export class SnepServer {
	readonly config = DEFAULT_SERVER_CONFIG;
	readonly logger = createLogger("ws");
	readonly wss: WebSocket.Server;

	public connections: Map<string, Socket> = new Map();
	public botSocket?: Socket;

	constructor(
		readonly global: KeppAPI,
		config: Partial<FoxServerConfig> = DEFAULT_SERVER_CONFIG,
	) {
		this.config = { ...DEFAULT_SERVER_CONFIG, ...config };
		this.wss = new WebSocket.Server({ port: this.config.port })
			.on("listening", () => {
				this.logger.info("SnepServer listening on", this.config.port);
			})
			.on("connection", (ws, con) => this.handleConnection(ws, con))
			.on("error", (err) => this.logger.error(err));
	}

	/**
	 * Handle a new socket connection.
	 * @param ws
	 * @param con
	 */
	public handleConnection(ws: WebSocket, incomingMessage: IncomingMessage) {
		const socket = new Socket(this, ws, incomingMessage);
		this.connections.set(socket.addr, socket);

		// Forget connection on close.
		socket.on(SocketEvents.Close, () =>
			this.connections.delete(socket.addr),
		);
	}

	/**
	 * Send an event to nyawesome.
	 */
	public sendBotEvent(ev: OutgoingSocketMessage<any>): this {
		if (!this.botSocket) {
			return this;
		}

		this.botSocket.send(ev);

		return this;
	}
}
