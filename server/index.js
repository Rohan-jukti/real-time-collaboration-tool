const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let documents = {};
let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-document", ({ docId, name }) => {
    socket.join(docId);

    if (!documents[docId]) documents[docId] = "";
    if (!users[docId]) users[docId] = 0;

    users[docId]++;

    socket.emit("load-document", documents[docId]);
    io.to(docId).emit("user-count", users[docId]);

    socket.on("send-changes", (data) => {
      documents[docId] = data;
      socket.to(docId).emit("receive-changes", data);
    });

    socket.on("disconnect", () => {
      users[docId]--;
      io.to(docId).emit("user-count", users[docId]);
    });
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});