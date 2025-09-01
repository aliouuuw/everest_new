import React from 'react';
import { useParams } from '@tanstack/react-router';
import UserForm from '@/components/CMS/Admin/UserForm';

const UserFormPage: React.FC = () => {
  const { userId } = useParams({ from: '/admin/users/$userId' });

  // If userId is 'new', treat it as creating a new user
  const actualUserId = userId === 'new' ? undefined : userId;

  return <UserForm userId={actualUserId} />;
};

export default UserFormPage;
