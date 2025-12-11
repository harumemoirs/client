/**
 * Generates and manages a unique browser identifier using crypto.randomUUID()
 * stored in localStorage for anonymous user tracking.
 * 
 * SSR-Safe: Only accesses localStorage on client side.
 */

const BROWSER_ID_KEY = "hm_browser_uuid";

/**
 * Checks if code is running in a browser environment
 */
const isBrowser = (): boolean => {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
};

/**
 * Gets the existing browser ID from localStorage
 * 
 * @returns The browser UUID string, or null if not found or running on server
 */
export const getBrowserId = (): string | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    return localStorage.getItem(BROWSER_ID_KEY);
  } catch (error) {
    console.error("Error reading browser ID from localStorage:", error);
    return null;
  }
};

/**
 * Generates a new browser ID using crypto.randomUUID()
 * Falls back to timestamp-based UUID for older browsers
 */
const generateBrowserId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

/**
 * Gets the existing browser ID or creates a new one if it doesn't exist
 * This is the primary function for getting the browser identifier
 * 
 * @returns The browser UUID string, or null if running on server
 */
export const getOrCreateBrowserId = (): string | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    let browserId = localStorage.getItem(BROWSER_ID_KEY);

    if (!browserId) {
      browserId = generateBrowserId();
      localStorage.setItem(BROWSER_ID_KEY, browserId);
    }

    return browserId;
  } catch (error) {
    console.error("Error managing browser ID:", error);
    return null;
  }
};

/**
 * Clears the browser ID from localStorage
 * Useful for testing or privacy features
 */
export const clearBrowserId = (): void => {
  if (!isBrowser()) {
    return;
  }

  try {
    localStorage.removeItem(BROWSER_ID_KEY);
  } catch (error) {
    console.error("Error clearing browser ID:", error);
  }
};
