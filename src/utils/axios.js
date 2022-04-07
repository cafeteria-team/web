import axios from "axios";
import { removeCookie } from "../utils/cookie";

// const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

const instance = axios.create({
  baseURL: "https://www.good-cafeteria.cf",
  // baseURL: PROXY,
  //proxy 설정후 빈칸
  timeout: 1000,
});

const access = localStorage.getItem("access");
instance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

// axios.interceptors.request.use(async (config) => {
//   if (!config.headers["Authorization"]) {
//     config.headers[
//       "Authorization"
//     ] = `Bearer ${process.env.REACT_APP_KEY}`;
//   }
//   config.headers["Content-Type"] = "application/json";

//   return config;
// });

// let isTokenRefreshing = false;

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    // const {
    //   config,
    //   response: { status },
    // } = error;
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      if (error.response?.data.detail === "Token is invalid or expired") {
        localStorage.removeItem("refresh");
        removeCookie("username");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.replace("/");
      } else if (
        error.response?.data.detail ===
        "Authorization header must contain two space-delimited values"
      ) {
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
