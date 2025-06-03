import React, { useState } from 'react';

const ImgBox = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', textAlign: 'center' }}>
      <h3>Upload an Image</h3>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <div style={{ marginTop: '20px' }}>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImgBox;