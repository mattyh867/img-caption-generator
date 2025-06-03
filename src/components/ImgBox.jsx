import "../css/ImgBox.css";
import React, { useState, useRef } from 'react';

const ImgBox = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="img-box" onClick={handleBoxClick} style={{ cursor: "pointer" }}>
      <h3>Upload an Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        style={{ display: "none" }}
      />
      {preview && (
        <div className="imgbox-preview">
          <img src={preview} alt="Preview" className="imgbox-image" />
        </div>
      )}
    </div>
  );
};

export default ImgBox;