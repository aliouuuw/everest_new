import { useState, useCallback } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

/**
 * Hook to upload a file to Cloudflare R2 via a presigned URL.
 * 1. Calls the Convex action to get a presigned PUT URL
 * 2. PUTs the file directly to R2
 * 3. Returns the public URL
 */
export function useR2Upload() {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
  });

  const getUploadUrl = useAction(api.r2Upload.getUploadUrl);

  const upload = useCallback(
    async (file: File, folder = "articles"): Promise<string> => {
      setState({ isUploading: true, progress: 0, error: null });

      try {
        // Generate unique file key
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 10);
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileKey = `${folder}/${timestamp}-${randomId}-${sanitizedName}`;

        setState((s) => ({ ...s, progress: 20 }));

        // Get presigned URL from Convex action
        const { uploadUrl, publicUrl } = await getUploadUrl({
          fileName: file.name,
          fileType: folder,
          contentType: file.type,
          fileKey,
        });

        setState((s) => ({ ...s, progress: 50 }));

        // PUT the file directly to R2
        const res = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!res.ok) {
          throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
        }

        setState({ isUploading: false, progress: 100, error: null });
        return publicUrl;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setState({ isUploading: false, progress: 0, error: msg });
        throw err;
      }
    },
    [getUploadUrl]
  );

  return { upload, ...state };
}
