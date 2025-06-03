// This code uses fetch to call the Hugging Face Inference API for object detection
const API_URL = "https://api-inference.huggingface.co/models/facebook/detr-resnet-50";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY; // Set this in your .env file

export async function detectObjects(file) {
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: file, // send the image file directly as the body
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const result = await response.json();
  // The result is an array of detected objects with 'label' and 'score'
  if (Array.isArray(result) && result.length > 0) {
    // Return an array of labels (unique)
    const labels = [...new Set(result.map(obj => obj.label))];
    return labels;
  }
  throw new Error(result.error || "No objects detected");
}

