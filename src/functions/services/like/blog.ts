import http from "@/functions/api/http";

export const toggleBlogLike = async (blogId: string, fingerprint: string) => {
  try {
    console.log('Toggling blog like:', { blogId, fingerprint }); // Debug log
    const res = await http.post(`/api/v2/blogs/user-like/toggle-like/${blogId}`, {
      fingerprint,
    });

    return res.data; 
  } catch (error: any) {
    console.error("Error toggling like:", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      fullError: error
    });
    throw new Error(error?.response?.data?.message || error?.message || "Failed to toggle like");
  }
};

export const checkBlogLike = async (blogId:string,fingerprint:string) => {
    try {
        console.log('Checking blog like:', { blogId, fingerprint }); // Debug log
        const res = await http.post(`/api/v2/blogs/user-like/check-like/${blogId}`,{
            fingerprint
        })
        return res.data;
    } catch (error:any) {
        console.error("Error checking like:", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
            statusText: error?.response?.statusText,
            fullError: error
        });
        throw new Error(error?.response?.data?.message || error?.message || "Failed to check like");
    }
}

export const getBlogLikes = async (slug:string ) => {
    try {
        const res = await http.get(`/api/v2/blogs/user-like/likes/${slug}`,{
    
        })
        return res.data;
    } catch (error:any) {
        console.error("Error getting likes:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to get likes");
    }
}

