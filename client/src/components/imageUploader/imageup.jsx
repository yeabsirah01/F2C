import React, { useState } from "react";
import { Image, Button, Group } from "@mantine/core";
import { FileInput } from "@mantine/core";

const ImageUploaderr = ({ onChange, previewUrl }) => {
  const [preview, setPreview] = useState(previewUrl);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    onChange(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Group position="center">
      <FileInput
        accept="image/*"
        onChange={handleInputChange}
        label="Select Image"
        placeholder="No file selected"
      />
      {preview && <Image src={preview} alt="Preview" fit="contain" />}
    </Group>
  );
};

export default ImageUploaderr;
