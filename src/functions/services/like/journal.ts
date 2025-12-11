import http from "@/functions/api/http";

export const toggleJournalLike = async (journalId: string, fingerprint: string) => {
  try {
    const res = await http.post(`/api/v2/journals/user-like/toggle-like/${journalId}`, {
      fingerprint,
    });

    return res.data; 
  } catch (error: any) {
    console.error("Error toggling like:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to toggle like");
  }
};

export const checkJournalLike = async (journalId:string,fingerprint:string) => {
    try {
        const res = await http.post(`/api/v2/journals/user-like/check-like/${journalId}`,{
            fingerprint
        })
        return res.data;
    } catch (error:any) {
        console.error("Error checking like:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to check like");
    }
}


export const getJournalLikes = async (slug:string ) => {
    try {
        const res = await http.get(`/api/v2/journals/user-like/likes/${slug}`,{
    
        })
        return res.data;
    } catch (error:any) {
        console.error("Error getting likes:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to get likes");
    }
}

