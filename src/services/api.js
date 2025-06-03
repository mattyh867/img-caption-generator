// This code uses fetch to call the Hugging Face Inference API for BLIP image captioning

const API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base";

// It's best to store your API key in an environment variable for security
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

export async function getCaption(file) {
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    Accept: "application/json"
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: file
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const result = await response.json();
  if (Array.isArray(result) && result[0]?.generated_text) {
    return result[0].generated_text;
  }
  throw new Error("No caption generated");
}