/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as api_cloudflare from "../api/cloudflare.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as cloudflare from "../cloudflare.js";
import type * as crons from "../crons.js";
import type * as externalNews from "../externalNews.js";
import type * as http from "../http.js";
import type * as investorProfiles from "../investorProfiles.js";
import type * as media from "../media.js";
import type * as publications from "../publications.js";
import type * as seedUsers from "../seedUsers.js";
import type * as siteContent from "../siteContent.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "api/cloudflare": typeof api_cloudflare;
  auth: typeof auth;
  categories: typeof categories;
  cloudflare: typeof cloudflare;
  crons: typeof crons;
  externalNews: typeof externalNews;
  http: typeof http;
  investorProfiles: typeof investorProfiles;
  media: typeof media;
  publications: typeof publications;
  seedUsers: typeof seedUsers;
  siteContent: typeof siteContent;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
