import http from "../../api/http";
 

export const getAllBlogs = async (page = 1, limit = 9) => {
  try {
    const res = await http.get("/api/v2/blog/all-blogs", {
      params: { page, limit },
    });

    return res.data;
  } catch (error: any) {
    console.error("Error fetching blogs:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to get blogs");
  }
};


export const getBlogBySlug = async (slug: string) => {
  try {
    const res = await http.get(`/api/v2/blog/by-slug/${slug}`);
    return res.data;  
  } catch (error) {
    console.error("Error fetching blog ", error);
    throw error;
  }
};

export const getBlogById = async (id:string) => {
  try {
    const res = await http.get(`/api/v2/blog/${id}`)
    return res.data
  } catch (error) {
    console.error('Error fetching blog',error)
    throw error
  }
}