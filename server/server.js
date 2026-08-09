import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import logger from './logger.js';

const app = express();
const httpServer = createServer(app);

app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

const io = new Server(httpServer, {
  transports: ["websocket", "polling"],
  cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    credentials: true 
  },
  allowEIO3: true
});

let activeSessions = 0;

io.on('connection', (socket) => {
  activeSessions++;
  logger.info(
    `[Socket Connected] ID: ${socket.id} | Active sessions: ${activeSessions}`
  );

  io.emit('activeSessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    logger.info(
      `[Socket Disconnected] ID: ${socket.id} | Active sessions: ${activeSessions}`
    );

    io.emit('activeSessions', activeSessions);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  logger.info(`WebSocket server is running on port ${PORT}`);
});
