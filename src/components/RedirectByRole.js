// src/components/RedirectByRole.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RedirectByRole = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  switch (user.role) {
    case "admin":
      return <Navigate to="/admin/dashboard" />;
    case "customer":
      return <Navigate to="/customer/dashboard" />;
    case "farmer":
      return <Navigate to="/farmer/dashboard" />;
    default:
      return <Navigate to="/login" />;
  }
};

export default RedirectByRole;
