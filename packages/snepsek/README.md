# snepsek

Command, module, and dynamic permission system for Eris.

## Modules

A module represents a set of methods, event listeners, and commands that all pertain to a similar functionality, be it fun-related, moderation-related, or something else.

Modules are defined by extending the base `Module` class, and then adding them to the client manually using `Client.addModule`, or by using a loading function like `Client.loadModulesIn`.
