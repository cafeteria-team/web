import { observable, action, makeObservable, toJS } from "mobx";
import axios from "../utils/axios";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";
import Decode from "../utils/decode";

class User {
  userId;
  authorization;

  constructor(userId, authorization) {
    this.userId = userId;
    this.authorization = authorization;
  }
}

export class AuthStore {
  // 다양한 store 관리하기위한 store
  rootStore;

  // 밑의 makeObservable의 선언으로 user,authorization은 observable로 변경
  // user,authorization 변경이되면 AuthStore가 리스닝하고있는 모든 컴포넌트가 변경이된다.
  user = {};

  constructor(root) {
    // decorator지원을 따로 할필요가없다
    makeObservable(
      this,
      // 상태값들을 observable로 변경
      {
        // 업체명
        user: observable,
        // observable 값들의 변경을 위한 액션
        // setUsername: action,
        // isAuthenticated: action,
        login: action,
        onLoginSucess: action,
        onSilentRefresh: action,
        logout: action,
      }
    );
    // 토큰 기본시간
    this.JWT_EXPIRY_TIME = 3600 * 1000;

    // rootStore를 받는다.
    this.rootStore = root;

    this.user = new User("", false);

    this.decode = new Decode();
  }

  // // 업체명 얻기
  // get getUserName() {
  //   return toJS(this._username);
  // }

  // // 인증상태
  // get authenticated() {
  //   return toJS(this._authorization);
  // }

  // 업체명 설정
  setUser = (access, state) => {
    if (access) {
      const userId = this.decode.getUserId(access);
      this.user = new User(userId, state);
    } else {
      this.user = new User("", state);
    }
  };

  // // 인증상태
  // isAuthenticated = (body) => {
  //   this._authorization = body;
  // };

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
      return response;
    } catch (error) {
      console.log(error.response);
      return false;
    }
  }

  onLoginSucess = (access, refresh, username) => {
    // user상태 저장
    this.setUser(access, true);

    // accessToken 저장
    localStorage.setItem("access", access);

    // refresh 값 쿠키로 저장
    localStorage.setItem("refresh", refresh);

    // username 저장
    setCookie("username", username, {
      path: "/",
      secure: true,
      samSite: "none",
    });

    // accessToken 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    // accessToken 만료하기 1분전에 로그인 연장
    setTimeout(this.onSilentRefresh, this.JWT_EXPIRY_TIME - 60000);
  };

  onSilentRefresh = async () => {
    // console.log("onSilentRefresh 호출");
    const data = localStorage.getItem("refresh");
    const username = getCookie("username");

    try {
      const res = await axios.post(
        "/api/user/token/refresh/",
        { refresh: data }
        // {
        //   withCredentials: true,
        // }
      );
      this.onLoginSucess(res.data.access, res.data.refresh, username);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  logout = () => {
    this.setUser("", false);
    removeCookie("username");
    localStorage.clear();
  };
}
