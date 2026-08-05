import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let activeSessions = 0;

io.on('connection', (socket) => {
  activeSessions++;
  io.emit('activeSessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    io.emit('activeSessions', activeSessions);
  });
});

httpServer.listen(3001, () => {
  console.log('WebSocket server is running on port 3001');
});