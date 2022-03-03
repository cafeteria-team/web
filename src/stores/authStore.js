import { observable, action, makeObservable, toJS, computed } from "mobx";
import axios from "../utils/axios";
import { setCookie, getCookie } from "../utils/cookie";

class AuthStore {
  constructor() {
    makeObservable(this);
    this.JWT_EXPIRY_TIME = 3600 * 1000;
  }

  async onSilentRefresh() {
    const data = getCookie("refresh");

    if (data) {
      try {
        const response = await axios.post(
          "/api/user/token/refresh/",
          { refresh: data },
          {
            withCredentials: true,
          }
        );
        setCookie("refresh", response.data.refresh, {
          path: "/",
          secure: true,
          samSite: "none",
        });
        this.onLoginSucess(response.data.access);
      } catch (error) {
        console.log(error);
      }
    }
  }

  onLoginSucess = (data) => {
    this.isAuthenticated(true);

    // accessToken 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;

    // accessToken 만료하기 1분전에 로그인 연장
    setTimeout(this.onSilentRefresh, this.JWT_EXPIRY_TIME - 60000);
  };

  // 유저
  @observable
  _username = "";
  //업체명으로변경

  @observable
  _authorization = null;

  get authenticated() {
    return toJS(this._authorization);
  }

  get getUserName() {
    return toJS(this._username);
  }

  @action
  async login(profile) {
    const { username, password } = profile;
    try {
      const response = await axios.post(
        "/api/user/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      this.setUsername(username);
      this.onLoginSucess(response.data.refresh);
      setCookie("refresh", response.data.refresh, {
        path: "/",
        secure: true,
        samSite: "none",
      });
      return response;
    } catch (error) {
      console.log(error.response);
      // console.log(error.response.data.detail, body);
      return false;
    }
  }

  setUsername(body) {
    this._username = body;
  }

  @action
  isAuthenticated(body) {
    this._authorization = body;
  }

  @action
  logout() {
    this._auth.clearAll();
  }
}

export default new AuthStore();
