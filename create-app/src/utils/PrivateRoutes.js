import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ token }) => {
  console.log("Checking token in PrivateRoutes:", token);
  return token ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoutes;
