import express from "express";
import "dotenv/config";
import mongoConnect from "./connections/mongo.js";
import signupRoute from "./routes/signupRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import loginRoute from "./routes/loginRoutes.js";
import authRoute from "./routes/authRoute.js";
import chatRoute from "./routes/chatRoute.js";
import { wsconnect } from "./connections/websocket.js";

import wshandshake from "./routes/wshandshake.js";

const port = process.env.PORT;
const clientURL = process.env.clientURL;
const app = express();

/// db connection
mongoConnect();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [clientURL, "http://localhost:5173"];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// ws http connection

wsconnect();
app.use("/api/ws/handshake", wshandshake);
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/checkauth", authRoute);
app.use("/api/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("Hey there, welcome to Connectify!");
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
