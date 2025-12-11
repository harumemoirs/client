"use client";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState, useEffect } from "react";

// Comprehensive TypeScript interfaces
export interface NavigationOptions {
  replace?: boolean;
  scroll?: boolean;
  timeout?: number;
  shallow?: boolean;
}

export interface PrefetchOptions {
  kind?: "auto" | "full";
  priority?: boolean;
}

export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
}

export interface NavigationMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  path: string;
  success: boolean;
  error?: string;
}

export interface NavigationState {
  isNavigating: boolean;
  currentPath: string;
  previousPath?: string;
  error: NavigationError | null;
}

// Enhanced custom error classes
export class NavigationError extends Error {
  public readonly code: string;
  public readonly originalError?: unknown;
  public readonly timestamp: number;
  public readonly path?: string;

  constructor(
    message: string,
    code: string = "NAVIGATION_ERROR",
    originalError?: unknown,
    path?: string
  ) {
    super(message);
    this.name = "NavigationError";
    this.code = code;
    this.originalError = originalError;
    this.timestamp = Date.now();
    this.path = path;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NavigationError);
    }
  }
}

export class NavigationTimeoutError extends NavigationError {
  constructor(path: string, timeout: number) {
    super(
      `Navigation to ${path} timed out after ${timeout}ms`,
      "NAVIGATION_TIMEOUT",
      undefined,
      path
    );
    this.name = "NavigationTimeoutError";
  }
}

// Performance monitoring utilities
class NavigationPerformanceMonitor {
  private static metrics: NavigationMetrics[] = [];
  private static maxMetrics = 100;

  static startNavigation(path: string): NavigationMetrics {
    const metric: NavigationMetrics = {
      startTime: performance.now(),
      path,
      success: false,
    };

    this.metrics.push(metric);

    // Keep only last N metrics to prevent memory leaks
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    return metric;
  }

  static endNavigation(
    metric: NavigationMetrics,
    success: boolean,
    error?: string
  ): void {
    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    metric.success = success;
    metric.error = error;
  }

  static getMetrics(): NavigationMetrics[] {
    return [...this.metrics];
  }

  static getAverageNavigationTime(): number {
    const successfulMetrics = this.metrics.filter(
      (m) => m.success && m.duration
    );
    if (successfulMetrics.length === 0) return 0;

    const total = successfulMetrics.reduce(
      (sum, m) => sum + (m.duration || 0),
      0
    );
    return total / successfulMetrics.length;
  }

  static clearMetrics(): void {
    this.metrics = [];
  }
}

// Type for Next.js router (using ReturnType to get the actual type)
type NextRouter = ReturnType<typeof useRouter>;

// Enhanced Navigation Hook
export const useNavigation = () => {
  const router = useRouter() as NextRouter;
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentMetricRef = useRef<NavigationMetrics | null>(null);
  const mountedRef = useRef(true);

  // Navigation state management
  const [navigationState, setNavigationState] = useState<NavigationState>({
    isNavigating: false,
    currentPath: typeof window !== "undefined" ? window.location.pathname : "",
    error: null,
  });

  // Client-side check
  const isClient = typeof window !== "undefined";

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Enhanced state updater with safety checks
  const updateNavigationState = useCallback(
    (updates: Partial<NavigationState>) => {
      if (!mountedRef.current) return;
      setNavigationState((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  // History detection using modern APIs
  const hasNavigationHistory = useCallback((): boolean => {
    if (!isClient) return false;

    try {
      // Modern approach - check history state and referrer
      return (
        window.history.length > 1 &&
        (!!document.referrer ||
          !!window.history.state ||
          window.location.href !== window.location.origin + "/")
      );
    } catch {
      return window.history.length > 1;
    }
  }, [isClient]);

  // Core navigation with enhanced error handling and performance monitoring
  const navigateTo = useCallback(
    (path: string, options: NavigationOptions = {}): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (!isClient) {
          console.warn("Navigation attempted on server side");
          resolve();
          return;
        }

        // Validation
        if (!path || typeof path !== "string") {
          const error = new NavigationError(
            `Invalid path provided: ${path}`,
            "INVALID_PATH"
          );
          updateNavigationState({ error });
          reject(error);
          return;
        }

        // Start performance monitoring
        const metric = NavigationPerformanceMonitor.startNavigation(path);
        currentMetricRef.current = metric;

        // Update navigation state
        updateNavigationState({
          isNavigating: true,
          previousPath: navigationState.currentPath,
          error: null,
        });

        try {
          // Sanitize path
          const sanitizedPath = path.trim().replace(/[<>]/g, "");

          // Check for external URLs
          if (
            sanitizedPath.startsWith("http") ||
            sanitizedPath.startsWith("//")
          ) {
            const warning =
              "External URL detected. Use smartNavigate() or navigateToExternal()";
            console.warn(warning, sanitizedPath);
            updateNavigationState({ isNavigating: false });
            NavigationPerformanceMonitor.endNavigation(metric, false, warning);
            resolve();
            return;
          }

          // Cancel any existing navigation
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }

          // Setup new abort controller
          abortControllerRef.current = new AbortController();
          const signal = abortControllerRef.current.signal;

          // Setup timeout
          const timeout = options.timeout || 15000;
          const timeoutId = setTimeout(() => {
            if (!signal.aborted) {
              abortControllerRef.current?.abort();
              const error = new NavigationTimeoutError(path, timeout);
              updateNavigationState({ isNavigating: false, error });
              NavigationPerformanceMonitor.endNavigation(
                metric,
                false,
                error.message
              );
              reject(error);
            }
          }, timeout);

          // Navigation completion handler
          const handleNavigationComplete = () => {
            if (!mountedRef.current) return;

            clearTimeout(timeoutId);
            updateNavigationState({
              isNavigating: false,
              currentPath: sanitizedPath,
              error: null,
            });
            NavigationPerformanceMonitor.endNavigation(metric, true);
            resolve();
          };

          // Navigation error handler
          const handleNavigationError = (error: unknown) => {
            if (!mountedRef.current) return;

            clearTimeout(timeoutId);
            const navError =
              error instanceof NavigationError
                ? error
                : new NavigationError(
                    "Navigation failed",
                    "NAVIGATION_FAILED",
                    error,
                    path
                  );

            updateNavigationState({ isNavigating: false, error: navError });
            NavigationPerformanceMonitor.endNavigation(
              metric,
              false,
              navError.message
            );
            reject(navError);
          };

          // Perform navigation (Next.js router methods are synchronous)
          try {
            if (options.replace) {
              router.replace(sanitizedPath, { scroll: options.scroll ?? true });
            } else {
              router.push(sanitizedPath, { scroll: options.scroll ?? true });
            }

            // Since Next.js navigation is synchronous, we complete immediately
            // In a real app, you might want to listen to route change events
            setTimeout(handleNavigationComplete, 0);
          } catch (navError) {
            handleNavigationError(navError);
          }
        } catch (error) {
          const navError = new NavigationError(
            "Navigation setup failed",
            "SETUP_FAILED",
            error,
            path
          );
          updateNavigationState({ isNavigating: false, error: navError });
          NavigationPerformanceMonitor.endNavigation(
            metric,
            false,
            navError.message
          );
          reject(navError);
        }
      });
    },
    [router, isClient, navigationState.currentPath, updateNavigationState]
  );

  // Enhanced retry mechanism with exponential backoff and jitter
  const navigateToWithRetry = useCallback(
    async (
      path: string,
      options: NavigationOptions = {},
      retryOptions: RetryOptions = {}
    ): Promise<void> => {
      const {
        maxRetries = 3,
        baseDelay = 1000,
        maxDelay = 10000,
      } = retryOptions;

      let lastError: NavigationError | null = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          await navigateTo(path, options);
          return; // Success!
        } catch (error) {
          lastError =
            error instanceof NavigationError
              ? error
              : new NavigationError(
                  "Unknown retry error",
                  "RETRY_FAILED",
                  error,
                  path
                );

          if (attempt < maxRetries) {
            // Exponential backoff with jitter
            const delay = Math.min(
              baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
              maxDelay
            );

            console.warn(
              `Navigation retry ${attempt + 1}/${maxRetries} for path: ${path}`
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }

      // All retries failed
      console.error(
        `All navigation attempts failed for path: ${path}`,
        lastError
      );

      // Final fallback to window.location
      if (isClient && path.startsWith("/")) {
        try {
          window.location.href = path;
        } catch {
          throw lastError;
        }
      } else {
        throw lastError;
      }
    },
    [navigateTo, isClient]
  );

  // Enhanced navigation methods
  const navigateToWithReplace = useCallback(
    (
      path: string,
      options: Omit<NavigationOptions, "replace"> = {}
    ): Promise<void> => {
      return navigateTo(path, { ...options, replace: true });
    },
    [navigateTo]
  );

  const goBack = useCallback(async (): Promise<void> => {
    if (!isClient) return;

    try {
      if (hasNavigationHistory()) {
        router.back();
        updateNavigationState({
          isNavigating: true,
          previousPath: navigationState.currentPath,
        });

        // Complete navigation state update
        setTimeout(() => {
          updateNavigationState({
            isNavigating: false,
            currentPath: window.location.pathname,
          });
        }, 100);
      } else {
        await navigateTo("/");
      }
    } catch (error) {
      console.error("Back navigation error:", error);
      await navigateTo("/");
    }
  }, [
    router,
    navigateTo,
    isClient,
    hasNavigationHistory,
    navigationState.currentPath,
    updateNavigationState,
  ]);

  const goForward = useCallback((): void => {
    if (!isClient) return;

    try {
      router.forward();
      updateNavigationState({ isNavigating: true });

      setTimeout(() => {
        updateNavigationState({
          isNavigating: false,
          currentPath: window.location.pathname,
        });
      }, 100);
    } catch (error) {
      console.error("Forward navigation error:", error);
      updateNavigationState({
        error: new NavigationError(
          "Forward navigation failed",
          "FORWARD_FAILED",
          error
        ),
      });
    }
  }, [router, isClient, updateNavigationState]);

  const refresh = useCallback((): void => {
    if (!isClient) return;

    try {
      router.refresh();
    } catch (error) {
      console.error("Refresh error:", error);
      // Fallback to window reload
      window.location.reload();
    }
  }, [router, isClient]);

  // Enhanced prefetch with intelligent caching
  const prefetch = useCallback(
    (path: string, options: PrefetchOptions = {}): void => {
      if (!isClient) return;

      try {
        if (!path || typeof path !== "string") {
          console.warn("Invalid path provided to prefetch:", path);
          return;
        }

        const sanitizedPath = path.trim().replace(/[<>]/g, "");

        // Skip prefetch for invalid paths
        if (
          sanitizedPath.startsWith("http") ||
          sanitizedPath.startsWith("//") ||
          sanitizedPath === window.location.pathname ||
          sanitizedPath.startsWith("#") ||
          sanitizedPath.includes("javascript:") ||
          sanitizedPath.includes("data:")
        ) {
          return;
        }

        // Convert options to Next.js format - use only supported prefetch kinds
        const validKind = options.kind === "full" ? "full" : "auto";

        router.prefetch(sanitizedPath, {
          kind: validKind as any, // Type assertion to handle Next.js internal types
        });
      } catch (error) {
        console.error("Prefetch error:", error);
        // Silently fail for prefetch as it's not critical
      }
    },
    [router, isClient]
  );

  // Enhanced external URL detection
  const isExternalUrl = useCallback(
    (url: string): boolean => {
      if (!isClient || !url) return false;

      try {
        // Handle protocol-relative URLs
        const testUrl = url.startsWith("//")
          ? window.location.protocol + url
          : url;
        const parsedUrl = new URL(testUrl, window.location.origin);

        return parsedUrl.origin !== window.location.origin;
      } catch {
        // Fallback to pattern matching
        return (
          url.startsWith("http") ||
          url.startsWith("//") ||
          url.includes("://") ||
          /^[a-z][a-z\d+.-]*:/i.test(url)
        );
      }
    },
    [isClient]
  );

  // Enhanced external navigation with security
  const navigateToExternal = useCallback(
    (url: string, target: string = "_blank"): Window | null => {
      if (!isClient) return null;

      try {
        if (!url || typeof url !== "string") {
          console.warn("Invalid URL provided to navigateToExternal:", url);
          return null;
        }

        // Additional validation for external URLs
        if (
          !isExternalUrl(url) &&
          !url.startsWith("http") &&
          !url.startsWith("//")
        ) {
          console.warn("URL does not appear to be external:", url);
          return null;
        }

        // Security features
        const securityFeatures = [
          "noopener",
          "noreferrer",
          target === "_blank" ? "nofollow" : "",
        ]
          .filter(Boolean)
          .join(",");

        const newWindow = window.open(url, target, securityFeatures);

        // Additional security measures
        if (newWindow && target === "_blank") {
          newWindow.opener = null;
        }

        return newWindow;
      } catch (error) {
        console.error("External navigation error:", error);
        return null;
      }
    },
    [isClient, isExternalUrl]
  );

  // Smart navigation with automatic detection
  const smartNavigate = useCallback(
    async (url: string, options: NavigationOptions = {}): Promise<void> => {
      if (isExternalUrl(url)) {
        navigateToExternal(url);
      } else {
        await navigateTo(url, options);
      }
    },
    [isExternalUrl, navigateToExternal, navigateTo]
  );

  // Intelligent batch prefetching with resource management
  const batchPrefetch = useCallback(
    (paths: string[], options: PrefetchOptions = {}): void => {
      if (!isClient || !Array.isArray(paths) || paths.length === 0) return;

      const validPaths = paths
        .filter(
          (path) =>
            typeof path === "string" && path.trim() && !isExternalUrl(path)
        )
        .slice(0, 10); // Limit to prevent overwhelming

      if (validPaths.length === 0) return;

      const maxConcurrent = 3;
      let currentIndex = 0;

      const prefetchBatch = () => {
        if (currentIndex >= validPaths.length) return;

        const batchEnd = Math.min(
          currentIndex + maxConcurrent,
          validPaths.length
        );
        const currentBatch = validPaths.slice(currentIndex, batchEnd);

        currentBatch.forEach((path, index) => {
          const delay = index * 150 + Math.random() * 100; // Jittered timing
          setTimeout(() => {
            if (mountedRef.current) {
              prefetch(path, options);
            }
          }, delay);
        });

        currentIndex = batchEnd;

        // Schedule next batch
        if (currentIndex < validPaths.length) {
          setTimeout(prefetchBatch, 800);
        }
      };

      // Start prefetching with a small delay to avoid blocking initial render
      setTimeout(prefetchBatch, 100);
    },
    [prefetch, isClient, isExternalUrl]
  );

  // Utility functions
  const getCurrentPath = useCallback((): string => {
    return isClient ? window.location.pathname : "";
  }, [isClient]);

  const getCurrentSearchParams = useCallback((): URLSearchParams => {
    return isClient
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  }, [isClient]);

  const isCurrentPath = useCallback(
    (path: string): boolean => {
      if (!isClient || !path) return false;
      return window.location.pathname === path;
    },
    [isClient]
  );

  // Enhanced query parameter navigation
  const navigateWithQuery = useCallback(
    async (
      path: string,
      queryParams: QueryParams = {},
      options: NavigationOptions = {}
    ): Promise<void> => {
      try {
        const baseUrl = isClient ? window.location.origin : "http://localhost";
        const url = new URL(path, baseUrl);

        // Handle query parameters
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            url.searchParams.set(key, String(value));
          } else {
            url.searchParams.delete(key);
          }
        });

        const finalPath = url.pathname + url.search + url.hash;
        await navigateTo(finalPath, options);
      } catch (error) {
        console.error("Navigate with query error:", error);
        // Fallback to basic navigation
        await navigateTo(path, options);
      }
    },
    [navigateTo, isClient]
  );

  // Update query parameters without full navigation
  const updateQueryParams = useCallback(
    async (
      queryParams: QueryParams,
      options: NavigationOptions = {}
    ): Promise<void> => {
      if (!isClient) return;

      const currentPath = window.location.pathname;
      await navigateWithQuery(currentPath, queryParams, {
        replace: true,
        ...options,
      });
    },
    [navigateWithQuery, isClient]
  );

  // Enhanced cleanup with performance monitoring
  const cleanup = useCallback((): void => {
    mountedRef.current = false;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    if (currentMetricRef.current && !currentMetricRef.current.endTime) {
      NavigationPerformanceMonitor.endNavigation(
        currentMetricRef.current,
        false,
        "Navigation cancelled during cleanup"
      );
    }
  }, []);

  // Performance utilities
  const getNavigationMetrics = useCallback(() => {
    return NavigationPerformanceMonitor.getMetrics();
  }, []);

  const getAverageNavigationTime = useCallback(() => {
    return NavigationPerformanceMonitor.getAverageNavigationTime();
  }, []);

  const clearNavigationMetrics = useCallback(() => {
    NavigationPerformanceMonitor.clearMetrics();
  }, []);

  // Return comprehensive navigation interface
  return {
    // Core navigation
    navigateTo,
    navigateToWithReplace,
    navigateToWithRetry,
    goBack,
    goForward,
    refresh,
    prefetch,

    // Enhanced features
    navigateToExternal,
    smartNavigate,
    batchPrefetch,
    navigateWithQuery,
    updateQueryParams,

    // Utilities
    isExternalUrl,
    getCurrentPath,
    getCurrentSearchParams,
    isCurrentPath,
    hasNavigationHistory,
    cleanup,

    // State and monitoring
    navigationState,
    getNavigationMetrics,
    getAverageNavigationTime,
    clearNavigationMetrics,

    // Legacy compatibility
    replace: navigateToWithReplace,
  };
};

// Enhanced global navigation management
class GlobalNavigationManager {
  private static instance: ReturnType<typeof useNavigation> | null = null;
  private static subscribers: Set<
    (instance: ReturnType<typeof useNavigation>) => void
  > = new Set();

  static setInstance(instance: ReturnType<typeof useNavigation>): void {
    this.instance = instance;
    this.subscribers.forEach((callback) => callback(instance));
  }

  static getInstance(): ReturnType<typeof useNavigation> | null {
    if (!this.instance) {
      console.warn(
        "Global navigation instance not initialized. Use useNavigationWithGlobal hook in a component first."
      );
    }
    return this.instance;
  }

  static subscribe(
    callback: (instance: ReturnType<typeof useNavigation>) => void
  ): () => void {
    this.subscribers.add(callback);

    if (this.instance) {
      callback(this.instance);
    }

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  static clearInstance(): void {
    this.instance = null;
  }
}

// Global navigation hooks
export const useNavigationWithGlobal = (): ReturnType<typeof useNavigation> => {
  const navigation = useNavigation();

  useEffect(() => {
    GlobalNavigationManager.setInstance(navigation);

    return () => {
      // Don't clear instance on unmount as other components might be using it
    };
  }, [navigation]);

  return navigation;
};

export const getGlobalNavigation = (): ReturnType<
  typeof useNavigation
> | null => {
  return GlobalNavigationManager.getInstance();
};

export const subscribeToGlobalNavigation = (
  callback: (instance: ReturnType<typeof useNavigation>) => void
): (() => void) => {
  return GlobalNavigationManager.subscribe(callback);
};

// Route constants with enhanced type safety
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact-us",
  PRIVACY: "/privacy-policy",
  TERMS: "/terms-and-conditions",
} as const;

// Enhanced route utilities
export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];

export const getRoute = (key: RouteKey): RouteValue => ROUTES[key];

export const isValidRoute = (path: string): path is RouteValue => {
  return Object.values(ROUTES).includes(path as RouteValue);
};

export const getRouteFromPath = (path: string): RouteKey | null => {
  const entry = Object.entries(ROUTES).find(([, value]) => value === path);
  return entry ? (entry[0] as RouteKey) : null;
};

// Route parameter utilities - Fixed return type
export const buildRoute = (
  route: RouteValue,
  params?: Record<string, string>
): string => {
  let path: string = route;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`[${key}]`, value).replace(`{${key}}`, value);
    });
  }

  return path;
};

// Export everything
export { NavigationPerformanceMonitor, GlobalNavigationManager };

export default useNavigation;
