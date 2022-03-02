import axios from "axios";

const instance = axios.create({
  // baseURL: "https://www.good-cafeteria.cf",
  baseURL: "",
  //proxy 설정후 빈칸
  timeout: 1000,
});

export default instance;
