// Cloudflare API handlers for ConvexDB integration
// httpAction endpoints for webhooks, deletion, and stats.
// The presigned-URL action lives in convex/r2Upload.ts ("use node").

import { httpAction } from "../_generated/server";
import { api } from "../_generated/api";

// Handle Cloudflare Images API webhook for processing completion
export const cloudflareImagesWebhook = httpAction(async (_ctx, request) => {
  try {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Verify webhook signature (in production, you should verify the webhook signature)
    const webhookData = await request.json();
    
    // Process the webhook data
    const { imageId, status, variants } = webhookData;

    if (status === "ready" && variants) {
      // Update media record with processed variants
      // This would typically involve finding the media record by cloudflareId
      // and updating it with the new variant URLs
      console.log("Image processing completed:", {
        imageId,
        variants: Object.keys(variants),
      });
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
});

// Handle file deletion requests
export const deleteFile = httpAction(async (ctx, request) => {
  try {
    if (request.method !== "DELETE") {
      return new Response("Method not allowed", { status: 405 });
    }

    const { mediaId, cloudflareId } = await request.json();

    if (!mediaId || !cloudflareId) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Delete from ConvexDB (marks as deleted)
    const result = await ctx.runMutation(api.cloudflare.deleteCloudflareFile, {
      mediaId: mediaId,
      cloudflareId: cloudflareId,
    });

    // In production, you would also call Cloudflare API to delete the actual file
    // await deleteFromCloudflare(cloudflareId);

    return new Response(JSON.stringify({
      success: true,
      result,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Deletion error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Deletion failed",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Get usage statistics endpoint
export const getUsageStats = httpAction(async (ctx, request) => {
  try {
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }

    const stats = await ctx.runQuery(api.cloudflare.getCloudflareStats, {});

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Stats error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Failed to get stats",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

