/**
 * A generic awaitable type that may or may not be awaitable.
 */
export type Awaitable<T> = Promise<T> | T;

/**
 * A generic optional type.
 */
export type Optional<T> = T | void | undefined;

/**
 * A generic, partial, optional type.
 */
export type Partional<T> = Optional<Partial<T>>;
