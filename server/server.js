import express from 'express'; 
import { createServer } from 'http'; 
import { Server } from 'socket.io'; 
import morgan from 'morgan';
import cors from 'cors'; 
import logger from './logger.js'; 
import { initialOrders, initialProducts } from './utils/mockData.js';

const app = express(); 
const httpServer = createServer(app); 

const corsOptions = {
  origin: ["http://localhost:5173", "https://test-task-frontend-eta.vercel.app"],
  methods: ['GET', 'POST', 'DELETE'], 
  credentials: true
};

app.use(cors(corsOptions)); 
app.use(express.json());

app.use( 
  morgan('combined', { 
    stream: { write: (message) => logger.info(message.trim()) }, 
  }) 
); 

let ordersDatabase = [...initialOrders]; 
let productsDatabase = [...initialProducts]; 

app.get('/api/orders', (req, res) => { 
  res.json(ordersDatabase); 
}); 

app.get('/api/products', (req, res) => { 
  res.json(productsDatabase); 
}); 

app.delete('/api/orders/:id', (req, res) => { 
  const orderId = parseInt(req.params.id, 10); 
  ordersDatabase = ordersDatabase.filter(order => order.id !== orderId); 
  productsDatabase = productsDatabase.filter(product => product.order !== orderId); 
  
  logger.info(`[API DB] Order ${orderId} and its products successfully deleted`); 
  res.json({ success: true, message: `Order ${orderId} successfully deleted` }); 
}); 

const io = new Server(httpServer, { 
  transports: ["websocket", "polling"], 
  cors: corsOptions,
  allowEIO3: true 
}); 

let activeSessions = 0; 

io.on('connection', (socket) => { 
  activeSessions++; 
  logger.info(`[Socket Connected] ID: ${socket.id} | Active sessions: ${activeSessions}`); 
  io.emit('activeSessions', activeSessions); 

  socket.on('disconnect', () => { 
    if (activeSessions > 0) activeSessions--;
    logger.info(`[Socket Disconnected] ID: ${socket.id} | Active sessions: ${activeSessions}`); 
    io.emit('activeSessions', activeSessions); 
  }); 
}); 

const PORT = (typeof globalThis.process !== 'undefined' && globalThis.process.env.PORT) || 3001;
httpServer.listen(PORT, () => { 
  logger.info(`WebSocket server is running on port ${PORT}`); 
});