import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, allowedRoles, redirectTo = '/' }) {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);
  const location = useLocation();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Kiểm tra authentication
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Kiểm tra role nếu có yêu cầu
  if (allowedRoles) {
    const userRole = user?.role;
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    if (!userRole || !rolesArray.includes(userRole)) {
      return <Navigate to={redirectTo} replace />;
    }
  }
  
  return children;
}

export default ProtectedRoute;