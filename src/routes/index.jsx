import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from '../shared/components/client/layout/ClientLayout';
import ShopLayout from '../shared/components/shop/layout/ShopLayout';
import PublicRoutes from './PublicRoutes';
import ClientRoutes from './client/ClientRoutes';
import ShopRoutes from './shop/ShopRoutes';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes - sử dụng ClientLayout */}
      <Route element={<ClientLayout />}>
        {PublicRoutes.map((route) => {
          const Page = route.component;
          return <Route path={route.path} element={<Page />} />;
        })}
      </Route>

      {/* Client routes - sử dụng ClientLayout */}
      <Route element={<ClientLayout />}>
        {ClientRoutes.map((route) => {
          const Page = route.component;
          return (
            <Route
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute allowedRoles={route.allowedRoles}>
                    <Page />
                  </ProtectedRoute>
                ) : (
                  <Page />
                )
              }
            />
          );
        })}
      </Route>

      {/* Shop routes - sử dụng ShopLayout và yêu cầu có shop */}
      <Route
        element={
          <ProtectedRoute requiresShop={true}>
            <ShopLayout />
          </ProtectedRoute>
        }
      >
        {ShopRoutes.map((route) => {
          const Page = route.component;
          return (
            <Route
              path={route.path}
              element={<Page />}
            />
          );
        })}
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

