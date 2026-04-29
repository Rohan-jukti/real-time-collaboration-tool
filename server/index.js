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
    methods: ["GET", "POST"]
  },
});

let documents = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-document", (docId) => {
    socket.join(docId);

    if (!documents[docId]) documents[docId] = "";

    socket.emit("load-document", documents[docId]);

    socket.on("send-changes", (data) => {
      documents[docId] = data;
      socket.to(docId).emit("receive-changes", data);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ FIXED PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});