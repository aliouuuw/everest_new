import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

// Media Hooks
export const usePublicationMedia = (publicationId: string) => {
  return useQuery(api.media.getPublicationMedia, { publicationId: publicationId as any });
};

export const useMediaByType = (fileType: string, limit?: number) => {
  return useQuery(api.media.getMediaByType, { fileType, limit });
};

export const useLinkMediaToPublication = () => {
  return useMutation(api.media.linkMediaToPublication);
};

export const useUpdateMedia = () => {
  return useMutation(api.media.updateMedia);
};

export const useDeleteMedia = () => {
  return useMutation(api.media.deleteMedia);
};

export const useUpdateMediaOrder = () => {
  return useMutation(api.media.updateMediaOrder);
};
