import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

// Users Hooks
export const useUsers = () => {
  return useQuery(api.users.getUsers);
};

export const useUser = (id: string) => {
  return useQuery(api.users.getUser, { id: id as any });
};

export const useUserByEmail = (email: string) => {
  return useQuery(api.users.getUserByEmail, { email });
};

export const useCreateUser = () => {
  return useMutation(api.users.createUser);
};

export const useUpdateUser = () => {
  return useMutation(api.users.updateUser);
};

export const useUpdateLastLogin = () => {
  return useMutation(api.users.updateLastLogin);
};

export const useDeleteUser = () => {
  return useMutation(api.users.deleteUser);
};
