import { WebSocketServer } from "ws";
import "dotenv/config";
import http from "http";
import { decodeToken } from "../helpers/jwtToken.js";
import GlobalMessage from "../model/globalSchema.js";

const port = process.env.webSocketPORT || 3001;

export function wsconnect() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("WS server is running");
  });
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    console.log("ws connected");
    ws.send("hello from ws");

    ws.on("message", async (msg) => {
      const data = msg.toString();
      const { message, token } = JSON.parse(data);
      const decodeUser = decodeToken(token);
      try {
        const storeMsg = new GlobalMessage({ message, userId: decodeUser._id });
        if (storeMsg.message && storeMsg.userId) {
          await storeMsg.save();
          ws.send("ok");
        }
      } catch (error) {
        ws.send("error");
      }
    });
    ws.on("close", () => {
      console.log("ws connection closed");
    });
    ws.on("error", (err) => {
      console.log("ws error", err);
    });
  });
  server.listen(port, () => {
    console.log("ws running on", port);
  });
}
