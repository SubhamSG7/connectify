import express from "express";
import "dotenv/config";

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hey there, welcome to Connectify!");
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
