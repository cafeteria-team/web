import axios from "axios";

class ImageUploader {
  constructor() {
    this.APIKEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
    this.UPLOADKEY = process.env.REACT_APP_CLOUDINARY_UPLOAD_KEY;
  }

  async upload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", this.UPLOADKEY);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${this.APIKEY}/upload`,
        { data }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
    }

    // const result = await fetch(
    //   `https://api.cloudinary.com/v1_1/${APIKEY}/upload`,
    //   {
    //     method: "POST",
    //     body: data,
    //   }
    // );
    // return await response;
  }
}

export default ImageUploader;
