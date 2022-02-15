import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.good-cafeteria.cf",
  timeout: 1000,
});

export default instance;
