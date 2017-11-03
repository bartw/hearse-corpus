const path = require("path");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const createLog = value => JSON.stringify({ type: "log", value: value });
const createFile = () =>
  JSON.stringify({ type: "file", value: "this is the content" });

app.use("/", express.static(path.join(__dirname, "../public")));
app.get("/api", (req, res) => {
  res.send("api");
});

wss.on("connection", ws => {
  ws.send(createLog("Message 1"));
  ws.send(createLog("Message 2"));
  ws.send(createLog("Message 3"));
  ws.send(createLog("Message 4"));
  ws.send(createFile());
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
