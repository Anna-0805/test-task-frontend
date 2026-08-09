# Inventory Management App (SPA)

This is a Single-Page Application (SPA) built for managing orders and products, featuring a real-time active browser sessions/tabs counter integrated via WebSockets.

**Live Demo:** test-task-frontend-eta.vercel.app


**Link to the project demonstration video:**
 https://drive.google.com/file/d/1C_CyGFft_fKSN8OCJphzuDB_aaOHMCGD/view?usp=sharing

 ## Database Schema
 The database architectural design layout :
 [Download Database Schema (PDF)](./db_schema.pdf)

## Tech Stack

**Frontend:** React.js, TypeScript, Redux Toolkit, React Router v6, Bootstrap 5, SCSS, Vite


**Backend/Realtime:** Node.js, Socket.io (Active sessions counter)


**DevOps:** Docker, Docker Compose

---

## Installation and Setup

### Prerequisites
Make sure you have [Docker](https://docker.com) and [Node.js](https://nodejs.org) installed on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com
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

1. **Architecture & State Management (Redux Toolkit):** Conforms strictly to the *Single Source of Truth* pattern. All domain logic, client-side filters, dynamic content indexing, and cascading deletes (removing an order automatically sweeps its dependent products) are managed entirely within Redux slices using strict TypeScript typing.
2. **Type Safety (TypeScript):** Fully refactored frontend codebase with explicit declarations for components, interfaces (`Product`, `Order`), React synthetic mouse events, and prop validation.
3. **Orders Page (`OrdersPage`):** Displays incoming deliveries with instant aggregated multi-currency conversions (USD/UAH) and responsive layouts. Selecting an item dynamically splits the interface to present nested items via granular presentation subcomponents (`SelectedOrderProducts`).
4. **Products Page (`ProductsPage`):** Features a master products data grid with searchable text parameters and a real-time reactive classification selector dropdown.
5. **Modals & Overlays:** Reusable, accessible transactional verification popups (`DeleteOrderModal`) wrapped with semantic Bootstrap fade structures and backdrop focal shading.
6. **TopMenu Navigation:** Implements real-time structural clock routines alongside localized browser instance trackers powered concurrently by active client-server event listening routines on `Socket.io`.