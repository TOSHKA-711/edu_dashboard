"use client"
// useImageUpload.ts
import { useEffect, useState } from "react";

export const useImageUpload = (
  setImageState: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setImageState(file);
    }
    e.target.value = ""; // reset input value
  };

  const resetImage = () => {
    setPreviewUrl(null);
    setImageState(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return {
    imagePreviewUrl: previewUrl,
    handleImageChange,
    resetImage,
  };
};
