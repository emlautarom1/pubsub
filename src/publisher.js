import { MESSAGE_COUNT, SERVER_PORT, LARGE_DATA, TEST_TOPIC } from "./config.js";
import WebSocket from 'ws';

const wss = new WebSocket(`ws://localhost:${SERVER_PORT}`);

wss.on('open', () => {
  const message = { action: 'publish', topic: TEST_TOPIC, data: LARGE_DATA };
  const json = JSON.stringify(message);

  for (let i = 0; i < MESSAGE_COUNT; i++) {
    wss.send(json);
  };

  wss.close();
});

wss.on('error', error => {
  console.error('WebSocket error:', error);
});