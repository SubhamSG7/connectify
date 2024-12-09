import express from "express";
import "dotenv/config";
import mongoConnect from "./connections/mongo.js";
import signupRoute from "./routes/signupRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
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

app.use("/api/signup", signupRoute);

app.get("/", (req, res) => {
  res.send("Hey there, welcome to Connectify!");
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
