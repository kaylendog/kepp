# utils

Utility functions, classes & modules used by Kepp.

## Sub-modules

- [`async`]() - asynchronous code methods
- [`logging`]() - colourized, pretty foxie~ logging
- [`object`]() - methods for working with objects
- [`validation`]() - strongly-typed object validation

## async

- `waitFor(length: number) => Promise<void>` - return a promise-like object which resolves after the specified length. Time is measured in milliseconds.
- `waitForEvent(emitter: EventEmitter, eventName: string) => Promise<any>` - wait for the event of name `eventName` to fire on the specified object. Resolves to the data fired by the event.

## logging

- `createLogger(name: string) => Logger` - returns a new logger object with prefix `name`.

### Logger

- `info(...msg: any[]) => this` - Information logging. Will always be visible unless quiet mode is set.
- `debug(...msg: any[]) => this` - Debug logging - only visible if log level is set to DEBUG.
- `warning(...msg: any[]) => this` - Warning information - can be silenced by setting silent mode.
- `error(...msg: any[]) => this`
- `success(...msg: any[]) => this`

## Object

- `flatten(obj: {})` - Take an object and break into a single level key-value map.

```ts
const exampleObject = { key: 'value', anotherObj: { key: 'value' } };

const flattened = flatten(exampleObject);
/* {
  key: 'value',
  'anotherObj.key': 'value'
}*/
```

## Validation

- `validateObject<T extends Schema>(schema: T, obj: ObjectFromSchema<T>) => SchemaValidation<T>` - validate an object matches a schema, both type-wise and at runtime.

### Types

- `ObjectSchema<T>` - Converts an object of constructor functions into its constructed type equivalent.
- `SchemaValidation<T>` - Represents the computed result of a validation, containing information about invalid and missing fields.

```ts
const schema = {
	name: String
};

let obj: ObjectFromSchema<typeof schema> = {
	name: 'kepp'
};

let result = validateObject(obj);
/* {
  valid: true,
  invalidFields: [],
  missingFields: []
} */
```
