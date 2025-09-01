import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

// Publications Hooks
export const usePublications = (filters?: {
  status?: "draft" | "published" | "archived";
  category?: string;
  limit?: number;
  offset?: number;
  featured?: boolean;
}) => {
  return useQuery(api.publications.getPublications, filters || {});
};

export const usePublication = (slug: string) => {
  return useQuery(api.publications.getPublicationBySlug, { slug });
};

export const useSearchPublications = (query: string, category?: string) => {
  return useQuery(api.publications.searchPublications, { query, category });
};

export const useCreatePublication = () => {
  return useMutation(api.publications.createPublication);
};

export const useUpdatePublication = () => {
  return useMutation(api.publications.updatePublication);
};

export const useDeletePublication = () => {
  return useMutation(api.publications.deletePublication);
};
