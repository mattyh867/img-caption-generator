import React, { useState } from "react";
import { detectObjects } from "../services/api";

const CaptionBox = ({ imageFile }) => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDetectObjects = async () => {
    setLabels([]);
    setError("");
    if (!imageFile) {
      setError("No image selected.");
      return;
    }
    setLoading(true);
    try {
      const detectedLabels = await detectObjects(imageFile);
      setLabels(detectedLabels);
    } catch (err) {
      setError("Failed to detect objects.");
    }
    setLoading(false);
  };

  return (
    <div className="img-box">
      <button onClick={handleDetectObjects} disabled={loading || !imageFile}>
        {loading ? "Detecting..." : "Detect Objects"}
      </button>
      {labels.length > 0 && (
        <div className="caption">
          Detected objects: {labels.join(", ")}
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default CaptionBox;