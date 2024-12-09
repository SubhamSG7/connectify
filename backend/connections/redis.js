import { createClient } from "@redis/client";

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("connect", () => {
  console.log("Connected to Redis...");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client
  .connect()
  .catch((err) => console.error("Error connecting to Redis:", err));

export default client;
