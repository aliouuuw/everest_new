import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "fetch-external-news",
  { hours: 6 },
  internal.externalNews.scheduledFetch,
  {}
);

export default crons;
