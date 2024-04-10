import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ token }) => {
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
