export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      // Handle rate limiting specifically
      if (res.status === 429) {
        const retryAfter = data.retryAfter || 900;
        throw {
          response: {
            status: 429,
            data: data,
          },
          message: data.message || "Rate limit exceeded",
          retryAfter,
          isRateLimited: true,
        };
      }
      
      // Handle other errors
      throw {
        response: {
          status: res.status,
          data: data,
        },
        message: data.message || data.error || "Failed to submit contact form",
      };
    }

    return data;
  } catch (error: any) {
    console.error("Error submitting contact form:", error?.response?.data || error);
    
    // Re-throw if it's already our structured error
    if (error.isRateLimited || error.response) {
      throw error;
    }
    
    throw error;
  }
};
