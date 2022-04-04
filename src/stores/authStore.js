import { observable, action, makeObservable, toJS } from "mobx";
import axios from "../utils/axios";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";

class User {
  username;
  authorization;
}
export class AuthStore {
  constructor() {
    // decorator지원을 따로 할필요가없다
    makeObservable(
      this,
      // 상태값들을 observable로 변경
      {
        // 업체명
        _username: observable,
        // 로그인인증
        _authorization: observable,
        // observable 값들의 변경을 위한 액션
        setUsername: action,
        isAuthenticated: action,
        setAccessToken: action,
        login: action,
        onLoginSucess: action,
        onSilentRefresh: action,
        logout: action,
      }
    );
    // 토큰 기본시간
    this.JWT_EXPIRY_TIME = 3600 * 1000;
  }

  // 업체명 얻기
  get getUserName() {
    return toJS(this._username);
  }

  // 인증상태
  get authenticated() {
    return toJS(this._authorization);
  }

  // 업체명 설정
  setUsername = (body) => {
    this._username = body;
  };

  // 인증상태
  isAuthenticated = (body) => {
    this._authorization = body;
  };

  // 로그인 시도
  async login(profile) {
    const { username, password } = profile;
    try {
      const response = await axios.post(
        "/api/user/login",
        {
          username,
          password,
        }
        // { withCredentials: true }
      );
      this.setUsername(username);
      this.onLoginSucess(response.data.refresh, response.data.access, username);
      return response;
    } catch (error) {
      console.log(error.response);
      return false;
    }
  }

  onLoginSucess = (refresh, access, username) => {
    // console.log("onLoginSuccess 호출");
    // console.log("onLoginSuccess data값은", data);

    // authenticated = true로 변경
    this.isAuthenticated(true);

    // refresh 값 쿠키로 저장
    localStorage.setItem("refresh", refresh);

    // username 저장
    setCookie("username", username, {
      path: "/",
      secure: true,
      samSite: "none",
    });

    // username store저장
    this.setUsername(username);

    // accessToken 저장
    localStorage.setItem("access", access);

    // accessToken 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    // accessToken 만료하기 1분전에 로그인 연장
    setTimeout(this.onSilentRefresh, this.JWT_EXPIRY_TIME - 60000);
  };

  onSilentRefresh = async () => {
    // console.log("onSilentRefresh 호출");
    const data = localStorage.getItem("refresh");
    const username = getCookie("username");

    if (data) {
      // console.log("onSilentRefresh / refresh token 데이터 값은 :", data);
      try {
        const res = await axios.post(
          "/api/user/token/refresh/",
          { refresh: data }
          // {
          //   withCredentials: true,
          // }
        );

        // 토큰저장
        // localStorage.setItem("refresh", res.data.refresh);
        // localStorage.setItem("access", res.data.access);

        this.onLoginSucess(res.data.refresh, res.data.access, username);
        // console.log(res);
        return res;
      } catch (error) {
        console.log(error.response);
      }
    } else {
      this.isAuthenticated(false);
    }
  };

  logout = () => {
    this.isAuthenticated(false);
    removeCookie("username");
    localStorage.clear();
  };
}
