# Inventory Management App (SPA)

This is a Single-Page Application (SPA) built for managing orders and products, featuring a real-time active browser sessions/tabs counter integrated via WebSockets.

**Live Demo (Frontend):** [ https://test-task-frontend-eta.vercel.app/] 

**Link to the project demonstration video:**
 https://drive.google.com/file/d/1C_CyGFft_fKSN8OCJphzuDB_aaOHMCGD/view?usp=sharing

 ## Database Schema
 The database architectural design layout :
 [Download Database Schema (PDF)](./db_schema.pdf)
 [Database SQL Script](./database_schema.sql)

## Tech Stack

**Frontend:** React.js, TypeScript, Redux Toolkit, React Router, Bootstrap, SCSS, Vite


**Backend/Realtime:** Node.js, Express, Socket.io (Active sessions counter), Winston & Morgan (Logging)


**DevOps & Architecture:** REST API (Axios), Docker, Docker Compose

---

## Installation and Setup

### Prerequisites
Make sure you have [Docker](https://docker.com) and [Node.js](https://nodejs.org) installed on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Anna-0805/test-task-frontend
cd test-task-frontend
```

---

## Method 1: Running via Docker Compose (Recommended)

This approach automatically builds and spins up both the **Frontend client** and the **WebSocket server** inside isolated containers simultaneously using a single command.

```bash
# Build and run the entire application ecosystem
docker-compose up --build
```

Once the compilation process finishes successfully:
- **Frontend Application:** Available at `http://localhost:5173` (or the port specified by Vite in your terminal)
- **WebSocket Server:** Automatically runs on `http://localhost:3001`

To stop and remove the containers, run:
```bash
docker-compose down
```

---

## Method 2: Running Locally via Terminal (Manual)

If you prefer to run the components manually without Docker, you will need to open **two separate terminal windows** because the frontend and the WebSocket server run on separate processes.

### 1. Start the WebSocket Server
Open your first terminal window and navigate to the server directory:
```bash
cd server
npm install
node server.js
```
*The server will start listening for socket connections on `http://localhost:3001`.*

### 2. Start the Frontend Client
Open your second terminal window at the root of the project (`test-task-frontend`):
```bash
npm install
npm run dev
```
*The React application will spin up and open at `http://localhost:5173`.*

---

## Features Implemented

1. **State Management & Single Source of Truth:** All business logic, including client-side filtering and cascading deletion of products when an order is removed, is fully synchronized with the global state using Redux Toolkit.
2. **Full REST API Integration:** The frontend communicates with the Node.js server via asynchronous controllers (`GET /api/orders`, `GET /api/products`, `DELETE /api/orders/:id`). End-to-end data cleanup is fully implemented on the backend database level.
3. **WebSockets (Socket.io):** The `TopMenu` component displays the exact number of active application tabs across the network in real time. The backend handles `connection` and `disconnect` events flawlessly.
4. **CSS Architecture (BEM):** Interface styles are modularized and written strictly according to the BEM methodology using nesting in SCSS.
5. **Animations & UI/UX:** Smooth transitions (`transition: all 0.3s ease-in-out`) are configured for the orders split-screen interface, and interactive overlays are utilized for deletion modals.
6. **Strict Typing (TypeScript):** Data interfaces, slice states, component props, and synthetic mouse events are strictly typed.