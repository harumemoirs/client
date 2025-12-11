import http from "../../api/http";
 

export const subscribe = async (email: string) => {
  try {
    const res = await http.post("/api/v2/newsletter/subscribe", {
      email,  
    });

    return res.data;
  } catch (error: any) {
    console.error("Error subscribing:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to subscribe");
  }
};
