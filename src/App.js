// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import FarmerDashboard from "./pages/Farmer/FarmerDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectByRole from "./components/RedirectByRole";
import AddProduct from "./pages/Farmer/AddProduct";
import MyProducts from "./pages/Farmer/MyProducts";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageOrders from "./pages/Admin/ManageOrders";
import MyCart from "./pages/Customer/MyCart";
import OrderStatus from "./pages/Customer/OrderStatus";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="flex-grow-1">
            <Routes>
              {/* Homepage for all users */}
              <Route path="/" element={<Home />} />

              {/* Role-based redirect */}
              <Route path="/redirect" element={<RedirectByRole />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Farmer Routes */}
              <Route
                path="/farmer/dashboard"
                element={
                  <ProtectedRoute>
                    <FarmerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farmer/add-product"
                element={
                  <ProtectedRoute>
                    <AddProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farmer/my-products"
                element={
                  <ProtectedRoute>
                    <MyProducts />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/manage-products"
                element={
                  <ProtectedRoute>
                    <ManageProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/manage-orders"
                element={
                  <ProtectedRoute>
                    <ManageOrders />
                  </ProtectedRoute>
                }
              />

              {/* Customer Routes */}
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <MyCart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-status"
                element={
                  <ProtectedRoute>
                    <OrderStatus />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
