import { v4 as uuidv4 } from 'uuid';

export const SERVER_PORT = 8080;
export const TEST_TOPIC = "test";
export const MESSAGE_COUNT = 100_000;
export const LARGE_DATA = uuidv4().repeat(10);