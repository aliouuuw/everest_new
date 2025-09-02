import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useCurrentUser = () => {
  const { isAuthenticated } = useConvexAuth();
  return useQuery(api.users.getCurrentUser, isAuthenticated ? {} : "skip");
};
