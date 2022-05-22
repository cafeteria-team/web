import axios from "axios";
import { checkToken, refreshErrorHandle } from "./refreshToken";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  timeout: 2000,
  headers: {},
});

instance.interceptors.request.use(checkToken, refreshErrorHandle);

export default instance;
