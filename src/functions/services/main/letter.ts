import http from "../../api/http";
 

export const getAllLetters = async (page = 1, limit = 9) => {
  try {
    const res = await http.get("/api/v2/letter/all-letters", {
      params: { page, limit },
    });

    return res.data;
  } catch (error: any) {
    console.error("Error fetching letters:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to get letters");
  }
};

export const getLetterById = async (id:string) => {
  try {
    const res = await http.get(`/api/v2/letter/letter-id/${id}`)
    return res.data
  } catch (error) {
    console.error('Error fetching letter',error)
    throw error
  }
}

export const getLetterByTitle = async (title: string) => {
  try {
    const res = await http.get(`/api/v2/letter/letter-title/${title}`)
    return res.data
  } catch (error) {
    console.error('Error fetching letter by title', error)
    throw error
  }
}

export const getLetterBySlug = async (slug: string) => {
  try {
    const res = await http.get(`/api/v2/letter/by-slug/${slug}`)
    return res.data
  } catch (error: any) {
    if (error?.response?.status !== 404) {
      console.error('Error fetching letter by slug', error)
    }
    throw error
  }
}