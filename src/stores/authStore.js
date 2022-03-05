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

  // auth
  @observable
  _authorization = null;

  // access token
  @observable
  _accessToken = "";

  get getUserName() {
    return toJS(this._username);
  }

  get authenticated() {
    return toJS(this._authorization);
  }

  get accessToken() {
    return toJS(this._accessToken);
  }

  onSilentRefresh = async () => {
    // console.log("onSilentRefresh 호출");
    const data = getCookie("refresh");
    const username = getCookie("username");

    if (data) {
      // console.log("onSilentRefresh 데이터 값", data);
      try {
        const res = await axios.post(
          "/api/user/token/refresh/",
          { refresh: data },
          {
            withCredentials: true,
          }
        );

        setCookie("refresh", res.data.refresh, {
          path: "/",
          secure: true,
          samSite: "none",
        });

        this.onLoginSucess(res.data.refresh, res.data.access, username);
        return res;
      } catch (error) {
        console.log(error);
      }
    } else {
      this.isAuthenticated(false);
    }
  };

  onLoginSucess = (refresh, access, username) => {
    // console.log("onLoginSuccess 호출");
    // console.log("onLoginSuccess data값은", data);

    // authenticated = true로 변경
    this.isAuthenticated(true);

    // refresh 값 쿠키로 저장
    setCookie("refresh", refresh, {
      path: "/",
      secure: true,
      samSite: "none",
    });

    // username 저장
    setCookie("username", username, {
      path: "/",
      secure: true,
      samSite: "none",
    });

    // username store저장
    this.setUsername(username);

    // accessToken 저장
    this.setAccessToken(access);

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
      this.onLoginSucess(response.data.refresh, response.data.access, username);
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

  @action
  setUsername = (body) => {
    this._username = body;
  };

  @action
  isAuthenticated = (body) => {
    this._authorization = body;
  };

  @action
  setAccessToken = (body) => {
    this._accessToken = body;
  };

  @action
  logout = () => {
    this.isAuthenticated(false);
    removeCookie("refresh");
    removeCookie("username");
  };
}

export default new AuthStore();
