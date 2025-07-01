# Minimal PubSub

A minimal (and probably incorrect) pub/sub server where clients can publish messages into a topic, and subscribe to topics.

Fully implemented on top of [ws](https://www.npmjs.com/package/ws)

## Usage

```shell
npm run server
npm run publisher
npm run subscriber
```

## Default settings

Settings are stored in `./src/config.js`

- The server listens port `8080`
-
- The publisher sends `100_000` messages
- Each message's payload is 360 bytes long
- The subscriber stops after receiving `100_000` messages
- The topic used is `test`