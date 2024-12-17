import WebSocket from "ws";
import "dotenv/config";
const port = process.env.webSocketPORT;
const wss = new WebSocket.Server({ port });
