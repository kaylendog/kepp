# querycord

Fully asynchronous, low-memory Discord API wrapper

## Motivation

querycord was created to get around the massive memory usages libraries like [discord.js]() use when dealing with a high number of shards.

Instead of using an in-memory cache for every shard, the shards connect to one pooled Redis cache, from which data can be pulled and pushed without messing with cross-shard communication.

## Design

### Queries

Queries form the basis of querycord, acting as an interface to select specific data in a given situation.

### MessageQuery

- `author` - a `UserQuery` pointing to the author of the message.
- `guild` - a `GuildQuery` pointing to the guild the message was sent in. This will not be defined for messages sent via DMs.
- `channel` a `ChannelQuery` pointing to the channel in which the message was sent.

### UserQuery
