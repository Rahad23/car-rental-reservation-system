import axios from "axios";

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);

  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!uploadPreset || !cloudName) {
    throw new Error("Cloudinary environment variables are not set correctly.");
  }

  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error: any) {
    console.error(
      "Error uploading the image:",
      error.response?.data || error.message
    );
  }
};
