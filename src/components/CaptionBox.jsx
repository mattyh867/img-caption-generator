import React, { useState } from "react";
import { getCaption } from "../services/api";

const CaptionBox = ({ imageFile }) => {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetCaption = async () => {
    setCaption("");
    setError("");
    if (!imageFile) {
      setError("No image selected.");
      return;
    }
    setLoading(true);
    try {
      const result = await getCaption(imageFile);
      setCaption(result);
    } catch (err) {
      setError("Failed to generate caption.");
    }
    setLoading(false);
  };

  return (
    <div className="img-box">
      <button onClick={handleGetCaption} disabled={loading || !imageFile}>
        {loading ? "Generating..." : "Generate Caption"}
      </button>
      {caption && (
        <div className="caption">
          Caption: {caption}
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default CaptionBox;