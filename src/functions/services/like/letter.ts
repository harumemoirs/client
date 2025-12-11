import http from "@/functions/api/http";

//to toggle like
export const toggleLetterLike = async (letterId: string, fingerprint: string) => {
  try {
    const res = await http.post(`/api/v2/letters/user-like/toggle-like/${letterId}`, {
      fingerprint,
    });

    return res.data; 
  } catch (error: any) {
    console.error("Error toggling like:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to toggle like");
  }
};

//to check if the user has liked 
export const checkLetterLike = async (letterId:string,fingerprint:string) => {
    try {
        const res = await http.post(`/api/v2/letters/user-like/check-like/${letterId}`,{
            fingerprint
        })
        return res.data;
    } catch (error:any) {
        console.error("Error checking like:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to check like");
    }
}

 
export const getLetterLikes = async (slug:string ) => {
    try {
        const res = await http.get(`/api/v2/letters/user-like/likes/${slug}`,{
    
        })
        return res.data;
    } catch (error:any) {
        console.error("Error getting likes:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to get likes");
    }
}

