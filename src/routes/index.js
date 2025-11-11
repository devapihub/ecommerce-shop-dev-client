import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      {PublicRoutes.map((route, index) => {
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}
    </Routes>
  );
};

export default AppRoutes;
