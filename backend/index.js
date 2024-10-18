import app from "./server.js";
import { WebSocketServer } from "ws";
import url from "url";
import https from "https";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Import SSL certificate
const SSLcert = {
  key: fs.readFileSync("/etc/letsencrypt/live/atakan.tech/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/atakan.tech/fullchain.pem"),
};

// Create https server using the SSL certificate and server.js
const server = https.createServer(SSLcert, app);
const port = 3000;
// Also create Websocket (WSS) server using the created https server
const wsServer = new WebSocketServer({ server });
// List of connections and users
const connections = {};
const users = {};
const messages = [];
let msgId = 0;

// Message handler
function handleMessage(message, uuid, username) {
  // When message is sent to the server, it takes the message and user data
  console.log(`${users[uuid].username} said: ${message}`);
  const messageData = {
    uuid,
    username,
    msgId,
    message: JSON.parse(message),
  };
  messages.push(messageData);
  console.log(messages);
  // Sends the message and user data to each client connected to the websocket
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    connection.send(JSON.stringify(messages));
  });
  msgId++;
}

// Close handler for closed connections
function handleClose(uuid) {
  delete connections[uuid];
  console.log(users[uuid].username, "disconnected");
  delete users[uuid];
}

// Websocket Server
wsServer.on("connection", (con, req) => {
  const { username } = url.parse(req.url, true).query;
  const uuid = uuidv4();
  console.log(username);

  connections[uuid] = con;

  users[uuid] = {
    username,
  };

  con.on("message", (message) => handleMessage(message, uuid, username));
  con.on("close", () => handleClose(uuid));
});

// HTTPS Server
server.listen(port, () => {
  console.log(`Server is running on atakan.tech:${port}`);
});
