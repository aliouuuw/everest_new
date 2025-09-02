import React from 'react';
import { ProtectedRoute } from '../../components/Auth/ProtectedRoute';
import AdminLayout from './AdminLayout';

const ProtectedAdminLayout: React.FC = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout />
    </ProtectedRoute>
  );
};

export default ProtectedAdminLayout;
