import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useCurrentUser = () => {
  return useQuery(api.auth.getCurrentUser);
};

export const useCreateUserOnLogin = () => {
  return useMutation(api.auth.createUserOnLogin);
};
