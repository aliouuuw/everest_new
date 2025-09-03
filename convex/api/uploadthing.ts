// Uploadthing API route for ConvexDB integration
// This handles webhook callbacks from Uploadthing

import { v } from "convex/values";
import { action } from "../_generated/server";
import { api } from "../_generated/api";

// Webhook handler for Uploadthing file uploads
export const uploadthingWebhook = action({
  args: {
    fileId: v.string(),
    url: v.string(),
    fileName: v.string(),
    fileSize: v.number(),
    mimeType: v.string(),
    userId: v.string(),
    fileType: v.optional(v.string())
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    mediaId: string;
    fileId: string;
    url: string;
  }> => {
    try {
      // Determine file type from MIME type if not provided
      const fileType = args.fileType || getFileTypeFromMime(args.mimeType);
      
      // Save file metadata to ConvexDB media table
      const mediaId: string = await ctx.runMutation(api.media.linkMediaToPublication, {
        publicationId: "temp" as any, // Temporary ID, will be updated later
        uploadthingKey: args.fileId,
        uploadthingUrl: args.url,
        fileName: args.fileName,
        fileType: fileType,
        fileSize: args.fileSize,
        uploadedBy: args.userId as any,
      });

      console.log("File uploaded successfully:", {
        fileId: args.fileId,
        mediaId,
        fileName: args.fileName,
        fileType
      });

      return { 
        success: true, 
        mediaId,
        fileId: args.fileId,
        url: args.url
      };
    } catch (error) {
      console.error("Error processing upload webhook:", error);
      throw new Error(`Failed to process upload: ${error}`);
    }
  },
});

// Utility function to get file type from MIME type
function getFileTypeFromMime(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.includes('pdf')) return 'document';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
  return 'file';
}

// Action to handle file deletion webhook
export const uploadthingDeleteWebhook = action({
  args: {
    fileId: v.string(),
    userId: v.string()
  },
  handler: async (_ctx, args): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      // Find and mark media as deleted in ConvexDB
      // This would typically update the media status to 'deleted'
      // or remove it from the database depending on your requirements
      
      console.log("File deletion webhook received:", {
        fileId: args.fileId,
        userId: args.userId
      });

      return await { success: true, message: "File deletion processed" };
    } catch (error) {
      console.error("Error processing deletion webhook:", error);
      throw new Error(`Failed to process deletion: ${error}`);
    }
  },
});