import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Navigation from "./components/Navigation";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <TopMenu />
        <div className="app-main-content">
          <Navigation />
          <div className="app-page-view">
            <Routes>
              <Route path="/" element={<Navigate to="/orders" replace />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/groups" element={<OrdersPage pageTitle="Группы" />} />
              <Route path="/users" element={<PlaceholderPage title="Пользователи" />} />
              <Route path="/settings" element={<PlaceholderPage title="Настройки" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;