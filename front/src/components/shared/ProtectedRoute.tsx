import { useAuthContext } from '@/contexts';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};