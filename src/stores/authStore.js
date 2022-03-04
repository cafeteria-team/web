import { observable, action, makeObservable, toJS, computed } from "mobx";
import axios from "../utils/axios";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";

class AuthStore {
  constructor() {
    makeObservable(this);
    // this.JWT_EXPIRY_TIME = 3600 * 1000;
    this.JWT_EXPIRY_TIME = 60000;
  }
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

  onSilentRefresh = async () => {
    console.log("onSilentRefresh 호출");
    const data = getCookie("refresh");

    if (data) {
      console.log("onSilentRefresh 데이터 값", data);
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
        this.onLoginSucess(response.data.refresh);
        return response;
      } catch (error) {
        console.log(error);
      }
      const instance = axios.post({
        baseURL: "https://www.good-cafeteria.cf/api/user/token/refresh/",
        timeout: 1000,
      });
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
    } else {
      this.isAuthenticated(false);
    }
  };

  onLoginSucess = (data) => {
    console.log("onLoginSuccess 호출");
    console.log("onLoginSuccess data값은", data);

    // authenticated = true로 변경
    this.isAuthenticated(true);

    // refresh 값 쿠키로 저장
    setCookie("refresh", data, {
      path: "/",
      secure: true,
      samSite: "none",
    });

    // accessToken 설정
    // axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;

    // accessToken 만료하기 1분전에 로그인 연장
    setTimeout(this.onSilentRefresh, this.JWT_EXPIRY_TIME - 1000);
  };

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
      // setCookie("refresh", response.data.refresh, {
      //   path: "/",
      //   secure: true,
      //   samSite: "none",
      // });
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
