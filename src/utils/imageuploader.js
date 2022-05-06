import axios from "axios";

class ImageUploader {
  constructor() {
    this.APIKEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
    this.UPLOADKEY = process.env.REACT_APP_CLOUDINARY_UPLOAD_KEY;
  }

  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", this.UPLOADKEY);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${this.APIKEY}/image/upload`,
        formData
      );
      console.log(response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  }
}

export default ImageUploader;
