import { EventEmitter } from 'events';
import { Context } from 'vm';

import { Command as CommandConstructor, CommandOptions, ModuleCommandHandler } from './Command';

type ModuleTask = () => void;
type ModuleGroup = {};

export abstract class Module extends EventEmitter {
	readonly commands = new Map<string, CommandConstructor>();
	readonly groups = new Map<string, ModuleGroup>();
	readonly tasks = new Map<string, ModuleTask>();

	constructor(readonly kepp: Kepp) {
		super();
	}

	@command()
	async test(ctx: Context) {}

	/**
	 * Called before module initialization.
	 */
	async moduleWillInit() {}

	/**
	 * Called after module initialization.
	 */
	async moduleDidInit() {}

	/**
	 * Return the name of the module - identical to the name of the module's constructor function.
	 */
	get name() {
		return this.constructor.name;
	}

	private _validateCommands() {}
}

/**
 * Mark a module method as a command.
 * @param commandOpts
 */
export const command = (opts?: CommandOptions) => {
	return (
		module: Module,
		name: string,
		descriptor: TypedPropertyDescriptor<ModuleCommandHandler>
	) => {
		if (descriptor.value) {
			module.commands.set(
				name,
				new CommandConstructor(name, descriptor.value, opts)
			);
		}
	};
};

export const disabled = (
	module: Module,
	name: string,
	descriptor: TypedPropertyDescriptor<ModuleCommandHandler>
) => {
	const cmd = module.commands.get(name);
	if (cmd) {
		cmd.disable();
	}
};

/**
 * Mark a module method as a task.
 * @param commandOpts
 */
export const Group = (groupOpts?: {}) => {
	return (
		module: Module,
		name: string,
		descriptor: TypedPropertyDescriptor<ModuleGroup>
	) => {
		module.groups.set(name, {});
	};
};

/**
 * Mark a module method as a task.
 */
export const Task = () => {
	return (
		module: Module,
		name: string,
		descriptor: TypedPropertyDescriptor<ModuleTask>
	) => {
		module.tasks.set(name, () => {});
	};
};
