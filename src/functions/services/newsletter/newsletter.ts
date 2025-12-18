import http from "../../api/http";


export const subscribe = async (email: string) => {
  try {
    const { data } = await http.post("/api/v2/newsletter/subscribe", {
      email,
    });

    return data;
  } catch (error: any) {
    // Re-throw if it's already our structured error (rate-limited or already subscribed)
    // This handles nested calls or re-throws
    if (error.isRateLimited || error.isAlreadySubscribed) {
      throw error;
    }

    if (error?.response) {
      const { status, data } = error.response;

      // Handle rate limiting specifically
      if (status === 429) {
        const retryAfter = data.retryAfter || 900;
        throw {
          message: data.message || "Rate limit exceeded",
          retryAfter,
          isRateLimited: true,
        };
      }

      // Handle "already subscribed" case - check both error and message fields
      const errorText = (data.message || data.error || "").toLowerCase();
      if (
        errorText.includes("already subscribed") ||
        errorText.includes("already registered")
      ) {
        throw {
          message: data.message || data.error,
          isAlreadySubscribed: true,
        };
      }

      // Handle other API errors
      throw new Error(data.message || data.error || "Failed to subscribe");
    }

    // Handle network errors or other unexpected errors
    throw new Error(error.message || "Failed to subscribe");
  }
};
