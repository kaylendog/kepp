import colors from 'colors/safe';

type LogLevel = 'info' | 'warning' | 'error' | 'debug' | 'success';

export class Logger {
	private readonly nameColor =
		Logger.colorNames[Math.floor(Math.random() * Logger.colorNames.length)];

	constructor(readonly name: string) {}

	public info(...msg: any[]): this {
		this.log('info', ...msg);
		return this;
	}

	public warn(...msg: any[]): this {
		this.log('warning', ...msg);
		return this;
	}

	public error(...msg: any[]): this {
		this.log('error', ...msg);
		return this;
	}

	public debug(...msg: any[]): this {
		this.log('debug', ...msg);
		return this;
	}

	public success(...msg: any[]): this {
		this.log('success', ...msg);
		return this;
	}

	/**
	 * Actually do the logging
	 * @param level
	 * @param content
	 */
	private log(level: LogLevel, ...content: any[]): void {
		return console.log(
			colors.gray(Logger.getTimestamp()),
			colors.gray('|'),
			Logger.getColor(this.nameColor)(this.name),
			colors.gray('|'),
			Logger.getColorFunction(level)(level),
			...content
		);
	}

	static levelPrefixes = {
		warning: 'warning',
		error: 'error',
		info: 'info',
		debug: 'debug',
		success: 'Success '
	};

	/**
	 * Get the appropriate coloring function. **Type-friendly**
	 */
	static getColorFunction = (level: LogLevel): ((string: string) => string) => {
		switch (level) {
			case 'debug': {
				return colors.blue;
			}
			case 'info': {
				return colors.cyan;
			}
			case 'error': {
				return colors.red;
			}
			case 'warning': {
				return colors.yellow;
			}
			case 'success': {
				return colors.green;
			}
		}
	};

	static getColor = (str: string) => {
		switch (str) {
			case 'red':
				return colors.red;
			case 'green':
				return colors.green;
			case 'blue':
				return colors.blue;
			case 'yellow':
				return colors.yellow;
			case 'cyan':
				return colors.cyan;
			case 'magenta':
				return colors.magenta;
			default:
				return colors.stripColors;
		}
	};

	/**
	 * Get the logging timestamp.
	 */
	static getTimestamp(): string {
		return new Date()
			.toISOString()
			.split('T')[1]
			.slice(0, -1);
	}

	static colorNames = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta'];
}

/**
 * Create a logger with the specified prefix.
 * @param name
 */
export const createLogger = (name: any): Logger => new Logger(name);
