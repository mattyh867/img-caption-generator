import axios from "axios";

const API_URL = "https://img-caption-generator-production.up.railway.app/api/caption";

export async function getCaption(file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(API_URL, formData);
    const result = response.data;
    if (result.caption) {
      return result.caption;
    }
    throw new Error(result.error || "No caption generated");
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
      error.message ||
      "API request failed"
    );
  }
}

