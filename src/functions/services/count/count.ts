import http from "@/functions/api/http";


export const getTotalCount = async () => {
    try {
        const res = await http.get('/api/v2/count/get-count');
        return res.data;
    } catch (error: any) {
        console.error("Error fetching total count:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to get total count");
    }
}
