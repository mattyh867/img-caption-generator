import axios from "axios";

export async function getCaption(file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post('/api/caption', formData);
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

