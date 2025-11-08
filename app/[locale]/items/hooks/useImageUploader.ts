"use client";
import { useEffect, useState } from "react";

interface UseImageUploadOptions {
  width?: number;
  height?: number;
}

export const useImageUpload = (
  setImageState: React.Dispatch<React.SetStateAction<File | null>>,
  options?: UseImageUploadOptions
) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      const requiredWidth = options?.width;
      const requiredHeight = options?.height;

      //  لو المقاسات محددة و الصورة مش مطابقة، اعمل تنبيه لكن كمل الرفع
      if (
        requiredWidth &&
        requiredHeight &&
        (width !== requiredWidth || height !== requiredHeight)
      ) {
        alert(
          `⚠️ تنبيه: المقاسات المطلوبة ${requiredWidth}×${requiredHeight}px، لكن المقاسات الحالية ${width}×${height}px.\nسيتم رفع الصورة على أي حال.`
        );
      }

      //  كمل عادي
      setPreviewUrl(imageUrl);
      setImageState(file);
    };

    img.onerror = () => {
      alert("❌ الملف الذي تم اختياره ليس صورة صالحة.");
      URL.revokeObjectURL(imageUrl);
    };

    img.src = imageUrl;
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
