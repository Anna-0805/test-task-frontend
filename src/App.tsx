import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TopMenu from "./components/TopMenu";
import Navigation from "./components/Navigation";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import { fetchOrders } from "./features/orders/ordersSlice";
import { fetchProducts } from "./features/products/productsSlice"
import { AppDispatch } from "./store"; 
import "./App.css";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <Router>
      <div className="app-wrapper">
        <TopMenu searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="app-main-content">
          <Navigation />
          <div className="app-page-view">
            <Routes>
              <Route path="/" element={<Navigate to="/orders" replace />} />
              <Route path="/orders" element={<OrdersPage searchQuery={searchQuery} />} />
              <Route path="/products" element={<ProductsPage searchQuery={searchQuery} />} />
              <Route path="/groups" element={<OrdersPage pageTitle="Groups" />} />
              <Route path="/users" element={<PlaceholderPage title="Users" />} />
              <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;