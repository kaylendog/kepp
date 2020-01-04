# SnepServer

SnepServer is the WebSocket integration with [nyawesome](https://github.com/catofpoptarts/nyawesome) itself. It handles the execution of dynamic updates between changes made on the frontend, and those made using commands on the bot.

### Events

All events dispatched to the gateway must be in the following JSON format:

```json
{ "op": 0, "d": {} }
```

If a message is received that isn't in this format, the backend will close the connection with the `UNKNOWN_OPCODE` error.

### Opcodes

Each message comes with an Opcode identifying which event the message is.

-   `0: DISPATCH` - Sent to/from the backend by clients wishing to perform updates.
-   `1: AUTHORIZE` - Sent to the backend when clients wish to authorize.
-   `2: HELLO` - Sent by the backend to successfully authorized clients. Should probably be renamed to `HELLO`.

### Error Codes

-   `4001: UNKNOWN_OPCODE` - When a message does not have a valid opcode/paylod.
-   `4002: DECODE_ERROR` - Sent when the backend cannot decode a message it has received.
-   `4003: NOT_AUTHORIZED` - Sent if the client attempts to perform an operation requiring authorization.
-   `4004: AUTHORIZATION_FAILED` - Sent if the authorization process fails.
-   `4005: ALREADY_AUTHORIZED` - Sent if the client has already authorized with the backend.
-   `4006: AUTHORIZATION_TIMEOUT` - Sent if the client fails to authorize within 10 seconds of connection.
