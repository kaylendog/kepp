<div align="center">
    <br />
    <p>
        <img src="https://raw.githubusercontent.com/kippfoxx/kepp/master/frontend/src/assets/brand/logo.png" width="500" alt="kepp" />
    </p>
    <br />
</div>

## Overview

`kepp` is a Discord bot built to do... well... I don't know really. It just does. That's the entire point, I guess.

## Sub-projects

- [`keppbot`](https://github.com/fuzzyfoxie/kepp/tree/master/keppbot) - A Discord bot for furries.
- [`backend`](https://github.com/fuzzyfoxie/kepp/tree/master/backend) - RESTful API for web integration with the bot and its database.
- [`frontend`](https://github.com/fuzzyfoxie/kepp/tree/master/frontend) - User-interactable interface for updating bot settings.
- [`socket-handler`](https://github.com/fuzzyfoxie/kepp/tree/master/socket-handler) - WebSocket load balancing for the Discord gateway.
- [`utils`](https://github.com/fuzzyfoxie/kepp/tree/master/utils) - Utility functions, classes & modules used by kepp and its various sub-projects.

## Packages

This repo contains a number of packages which are (or will be eventually) published to the NPM registry. These provide logic that I think would be useful outside of kepp's own development circles.

- [`snepsek`](https://github.com/fuzzyfoxie/kepp/tree/master/packages/snepsek) - Light-weight, module-based command library for Eris
- [`querycord`](https://github.com/fuzzyfoxie/kepp/tree/master/packages/querycord) - Query-based, asynchronous Discord library
- [`stateful`](https://github.com/fuzzyfoxie/kepp/tree/master/packages/stateful) - Redis client library specifically tailored for storing Discord API user data. 

## License

`kepp` is under the GPL-3.0 license, meaning anybody is free to make copies of, and contribute to kepp, given that any changes they make are also available for public view.