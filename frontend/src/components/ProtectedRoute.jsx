import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { user } = useAuth();
  
    return user != null ? <Outlet /> : <Navigate to="/login" replace />;
  };
  
  export default ProtectedRoute;