import { WebSocketServer } from 'ws';
import { SERVER_PORT } from "./config.js";
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer({ port: SERVER_PORT });

const SUBSCRIBERS = {};

wss.on('connection', (ws) => {
  const clientId = uuidv4();

  ws.on('message', (message) => {
    const { action, topic, data } = JSON.parse(message);

    switch (action) {
      case 'publish': {
        const subscribers = Object.values(SUBSCRIBERS);
        const notification = { from: clientId, data };
        for (const subscriber of subscribers) {
          subscriber.client.send(JSON.stringify(notification));
        }
        break;
      }
      case 'subscribe': {
        SUBSCRIBERS[clientId] = { client: ws };
        console.log(`Client '${clientId}' subscribed to topic '${topic}'`);
        break;
      }
      default: {
        console.error(`Unknown action from client '${clientId}':`, action);
        break;
      }
    }
  });

  ws.on('close', () => {
    delete SUBSCRIBERS[clientId];
    console.log(`Client '${clientId}'' disconnected`);
  });

  ws.on('error', (error) => {
    delete SUBSCRIBERS[clientId];
    console.error(`Error on client '${clientId}':`, error);
  });
});

console.log(`WebSocket server is running on ws://localhost:${SERVER_PORT}`);