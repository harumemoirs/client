export const subscribe = async (email: string) => {
  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Handle rate limiting specifically
      if (res.status === 429) {
        const retryAfter = data.retryAfter || 900;
        throw {
          message: data.message || "Rate limit exceeded",
          retryAfter,
          isRateLimited: true,
        };
      }
      
      // Handle other errors
      throw new Error(data.message || data.error || "Failed to subscribe");
    }

    return data;
  } catch (error: any) {
    console.error("Error subscribing:", error);
    
    // Re-throw if it's already our structured error
    if (error.isRateLimited) {
      throw error;
    }
    
    throw new Error(error.message || "Failed to subscribe");
  }
};

