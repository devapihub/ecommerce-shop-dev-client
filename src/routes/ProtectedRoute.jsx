import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, allowedRoles, requiresShop = false, redirectTo = '/' }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const { shop, loading: shopLoading } = useSelector((state) => state.shop);
  const location = useLocation();
  
  if (loading || (requiresShop && shopLoading)) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles) {
    const userRole = user?.role;
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    if (!userRole || !rolesArray.includes(userRole)) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  if (requiresShop) {
    if (!shop) {
      return <Navigate to="/shop/create" replace />;
    }
  }
  
  return children;
}

export default ProtectedRoute;