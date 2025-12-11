import http from "@/functions/api/http";

export const togglePoemLike = async (poemId: string, fingerprint: string) => {
  try {
    const res = await http.post(`/api/v2/poems/user-like/toggle-like/${poemId}`, {
      fingerprint,
    });

    return res.data; 
  } catch (error: any) {
    console.error("Error toggling like:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to toggle like");
  }
};

export const checkPoemLike = async (blogId:string,fingerprint:string) => {
    try {
        const res = await http.post(`/api/v2/poems/user-like/check-like/${blogId}`,{
            fingerprint
        })
        return res.data;
    } catch (error:any) {
        console.error("Error checking like:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to check like");
    }
}

export const getPoemLikes = async (slug:string ) => {
    try {
        const res = await http.get(`/api/v2/poems/user-like/likes/${slug}`,{
    
        })
        return res.data;
    } catch (error:any) {
        console.error("Error getting likes:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to get likes");
    }
}

