import axios from "axios";
import { checkToken, refreshErrorHandle } from "./refreshToken";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  timeout: 2000,
  headers: {},
});

export const requestInstance = axios.create();

instance.interceptors.request.use(checkToken, refreshErrorHandle);
