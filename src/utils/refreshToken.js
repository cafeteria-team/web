import { requestInstance } from "./axios";
import Decode from "./decode";
import { useNavigate } from "react-router-dom";

const checkToken = async (config) => {
  const refreshToken = localStorage.getItem("refresh");
  const expireAt = localStorage.getItem("expireAt");
  const access = localStorage.getItem("access");
  let currentTime = Date.now() / 1000;

  // 토큰이 만료되고, refreshToken이 저장되어 있을때
  if (currentTime >= expireAt && refreshToken) {
    try {
      const { data } = await requestInstance.post("/api/user/token/refresh/", {
        refresh: refreshToken,
      });
      const decode = new Decode();
      const access = data.access;
      const refresh = data.refresh;
      const { exp } = decode.getUserId(access);
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("expireAt", exp);

      config.headers["Authorization"] = `Bearer ${access}`;

      return config;
    } catch (err) {
      alert("세션이 만료되었습니다. 다시 로그인 해주십시오.");
      localStorage.clear();
      window.location.reload();
      return config;
    }
  } else if (currentTime < expireAt && refreshToken) {
    config.headers["Authorization"] = `Bearer ${access}`;
  }

  return config;
};

const refreshErrorHandle = (err) => {
  console.log(err);
  alert("세션이 만료되었습니다. 다시 로그인 해주십시오.");
  localStorage.clear();
};

export { checkToken, refreshErrorHandle };
