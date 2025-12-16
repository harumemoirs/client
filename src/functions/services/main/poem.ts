import http from "../../api/http";

export const getAllPoems = async (page = 1, limit = 9) => {
  try {
    const res = await http.get("/api/v2/poem/all-poems", {
      params: { page, limit },
    });

    return res.data;
  } catch (error: any) {
    console.error("Error fetching poems:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to get poems");
  }
};

export const getPoemById = async (id: string) => {
  try {
    const res = await http.get(`/api/v2/poem/poem-id/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching poem", error);
    throw error;
  }
};

export const getPoemBySlug = async (slug: string) => {
  try {
    const res = await http.get(`/api/v2/poem/poem--slug/${slug}`);
    return res.data;
  } catch (error: any) {
    if (error?.response?.status !== 404) {
      console.error("Error fetching poem by slug", error);
    }
    throw error;
  }
};
