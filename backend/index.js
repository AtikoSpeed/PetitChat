import app from "./server.js";
import { WebSocketServer } from "ws";
import url from "url";
import https from "https";
import fs from "fs";

const SSLcert = {
  key: fs.readFileSync("/etc/letsencrypt/live/atakan.tech/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/atakan.tech/fullchain.pem"),
};
const server = https.createServer(SSLcert, app);
const port = 3000;
const wsServer = new WebSocketServer({ server });

wsServer.on("connection", (con, req) => {
  const { username } = url.parse(req.url, true).query;
  console.log(username);
});

server.listen(port, () => {
  console.log(`Server is running on https://atakan.tech:${port}`);
});
