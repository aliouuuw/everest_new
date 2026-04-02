import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

/**
 * Error boundary that gracefully handles missing Convex provider.
 * Renders fallback (or nothing) when Convex is not configured,
 * re-throws all other errors.
 */
export class ConvexSafeBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    const isConvexError = 
      error.message.includes("Could not find Convex client") ||
      error.message.includes("ConvexProvider") ||
      error.message.includes("convex") ||
      error.message.includes("Convex");
    if (isConvexError) {
      return { hasError: true };
    }
    throw error;
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    const isConvexError = 
      error.message.includes("Could not find Convex client") ||
      error.message.includes("ConvexProvider") ||
      error.message.includes("convex") ||
      error.message.includes("Convex");
    if (!isConvexError) {
      throw error;
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
