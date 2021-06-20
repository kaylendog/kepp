import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { Awaitable } from "@kepp/shared";

import { KeppServer } from "./server";

/**
 * A generic middleware handler type.
 */
export type MiddlewareHandler = (server: KeppServer) => Awaitable<unknown>;

/**
 * Add the helmet security middleware to express.
 * @param e The server instance
 */
export const useHelmet: MiddlewareHandler = (s) => {
	s.logger.silly("applying helmet security middleware...");
	s.express.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false }));
};

/**
 * Add the morgan logging middleware to express.
 * @param s The server instance
 */
export const useMorgan: MiddlewareHandler = (s) => {
	s.logger.silly("Applying Morgan logging middleware...");
	s.express.use(morgan("common", { stream: { write: (msg) => s.logger.http(msg) } }));
};

/**
 * Add the express JSON body-parsing middleware to the express application.
 * @param s The server instance
 */
export const useJsonBodyParsing: MiddlewareHandler = (s) => {
	s.logger.silly("Applying JSON body parsing middleware...");
	s.express.use(express.json());
};

export const defaultNotFoundHandler: MiddlewareHandler = (s) => {
	s.express.use("*", (req, res) => res.status(404).json({ code: 0, message: "Error 404: Not Found." }));
};

/**
 * An array of default middleware.
 */
export const DEFAULT_MIDDLEWARE = [useHelmet, useMorgan, useJsonBodyParsing];
