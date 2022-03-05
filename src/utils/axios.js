import axios from "axios";
import { removeCookie } from "../utils/cookie";

const instance = axios.create({
  // baseURL: "https://www.good-cafeteria.cf",
  baseURL: "",
  //proxy 설정후 빈칸
  timeout: 1000,
});

// axios.interceptors.request.use(async (config) => {
//   if (!config.headers["Authorization"]) {
//     config.headers[
//       "Authorization"
//     ] = `Bearer ${process.env.REACT_APP_KEY}`;
//   }
//   config.headers["Content-Type"] = "application/json";

//   return config;
// });

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      removeCookie("refresh");
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
    return Promise.reject(error);
  }
);

export default instance;
