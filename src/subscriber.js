import { MESSAGE_COUNT, SERVER_PORT, TEST_TOPIC } from "./config.js";
import WebSocket from "ws";

const wss = new WebSocket(`ws://localhost:${SERVER_PORT}`);

wss.on('open', () => {
  console.log('Connected to WebSocket server');

  const subscribe = { action: 'subscribe', topic: TEST_TOPIC };
  wss.send(JSON.stringify(subscribe));

  let count = 0;
  let byteLength = 0;
  wss.on('message', (msg) => {
    if (count === 0) { console.time('* Processing time'); }
    count++;
    byteLength += msg.byteLength;

    if (count === MESSAGE_COUNT) {
      wss.close();
    }
  });

  wss.on('close', () => {
    console.log(`Connection closed:\n* Messages received: ${count}\n* Bytes received: ${formatBytes(byteLength)}`);
    if (count > 0) { console.timeEnd('* Processing time'); }
  });
});

function formatBytes(bytes) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = 2;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}