import React, { useState } from "react";

const ImageUploader = ({ onChange }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      onChange(reader.result);
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ maxWidth: "100%", width: "50px", height: "auto" }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
