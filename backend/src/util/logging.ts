import colors from "colors/safe";

type LogLevel = "info" | "warning" | "error" | "debug";

export class Logger {
	constructor(readonly name: string) {}

	public info(...msg: any[]): this {
		this.log("info", ...msg);
		return this;
	}

	public warn(...msg: any[]): this {
		this.log("warning", ...msg);
		return this;
	}

	public error(...msg: any[]): this {
		this.log("error", ...msg);
		return this;
	}

	public debug(...msg: any[]): this {
		this.log("debug", ...msg);
		return this;
	}

	/**
	 * Actually do the logging
	 * @param level
	 * @param content
	 */
	private log(level: LogLevel, ...content: any[]): void {
		return console.log(
			`${colors.gray(Logger.getTimestamp())} ${colors.white(
				"["
			)}${this.getLoggerPrefix(level)}${colors.white("]")}`,
			...content
		);
	}

	/**
	 * Get the logger prefix
	 * @param level
	 */
	private getLoggerPrefix(level: LogLevel): string {
		const colorizer = Logger.getColorFunction(level);
		const prefix = Logger.levelPrefixes[level];

		return colorizer(prefix + this.name);
	}

	static levelPrefixes = {
		warning: "WARNING ",
		error: "ERROR ",
		info: "",
		debug: "Debug ",
	};

	/**
	 * Get the appropriate coloring function.
	 */
	static getColorFunction = (
		level: LogLevel
	): ((string: string) => string) => {
		switch (level) {
			case "debug": {
				return colors.blue;
			}
			case "info": {
				return colors.cyan;
			}
			case "error": {
				return colors.red;
			}
			case "warning": {
				return colors.yellow;
			}
		}
	};

	/**
	 * Get the logging timestamp.
	 */
	static getTimestamp(): string {
		return new Date()
			.toISOString()
			.split("T")[1]
			.slice(0, -1);
	}
}

export const createLogger = (name: any): Logger => new Logger(name);
