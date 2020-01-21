# snepsek

Command, module, and dynamic permission system for Eris.

## Modules

A module represents a set of methods, event listeners, and commands that all pertain to a similar functionality, be it fun-related, moderation-related, or something else.

Modules are defined by extending the base `Module` class, and then adding them to the client manually using `Client.addModule`, or by using a loading function like `Client.loadModulesIn`.

### Example Module

```ts
/**
 * A very basic module with a simple ping command.
 */
class Test extends Module {
	@command()
	async ping(ctx: Context) {
		ctx.reply('Pong!');
	}
}
```

## Commands

A command represents a user-triggerable process for interacting with the bot and any data it has access to.

### Context

The `Context` wrapper class holds information about the context in which the command was run. This inclues the message parsed by the bot, the author, the guild, and settings obtained for the execution to occur.

- reply(content: string) - Reply to the command message

## Providers

Providers provide (see what I did there) a way of interfacing a means of storing configuration with the bot itself. Snepsek provides the base `SettingsProvider` abstract class which can be extended to suit specific needs.
