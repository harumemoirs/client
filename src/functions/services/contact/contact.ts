import axios from "axios";

export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const res = await axios.post("/api/contact", formData);
    return res.data;
  } catch (error: any) {
    console.error("Error submitting contact form:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to submit contact form");
  }
};
