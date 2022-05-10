import { observable, action, computed, makeObservable, toJS } from "mobx";
import axios from "../utils/axios";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";
import Decode from "../utils/decode";
import {
  makePersistable,
  getPersistedStore,
  stopPersisting,
  PersistStoreMap,
} from "mobx-persist-store";

class User {
  userId;
  authorization;
  access;
  refresh;

  constructor(userId, authorization, access, refresh) {
    this.userId = userId;
    this.authorization = authorization;
    this.access = access;
    this.refresh = refresh;
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
        //   observervable로 관리하는 데이터들은, mobx가 정의한 observervable데이터로 랩핑이된다.
        //   computed 를 사용하게 되면, user가 호출될때마다 toJS를 계속해서 호출될텐데, computed를사용시에
        //   observervable데이터가 변경이 일어나지 않으면 최종으로 캐싱하고 있는 데이터를 리턴한다.
        //   get메소드에서 observervable데이터에 대한 특정연산이 진행될때는 꼭 computed사용해야한다.
        getUser: computed,
        // observable 값들의 변경을 위한 액션
        login: action,
        setUser: action,
        onLoginSucess: action,
        onSilentRefresh: action,
        logout: action,
      }
    );

    this.checkStorage = Array.from(PersistStoreMap.values())
      .map((persistStore) => persistStore.storageName)
      .includes("AuthStore");

    makePersistable(this, {
      name: "AuthStore",
      properties: ["user"],
      storage: window.localStorage,
    });

    // 토큰 기본시간
    this.JWT_EXPIRY_TIME = 3600 * 1000;

    // rootStore를 받는다.
    this.rootStore = root;

    this.user = new User("", false, "");

    this.decode = new Decode();
  }

  getPersistedAuth() {
    try {
      const res = getPersistedStore(this);
      return toJS(res);
    } catch (err) {
      throw err;
    }
  }

  get getUser() {
    return toJS(this.user);
  }

  // 업체명 설정
  setUser = (access, refresh, state) => {
    if (access) {
      const userId = this.decode.getUserId(access).user_id;
      this.user = new User(userId, state, access, refresh);
    } else {
      this.user = new User("", state, "");
    }
  };

  // 로그인 시도
  login(profile) {
    const { username, password } = profile;
    try {
      const response = axios.post("/api/user/login", {
        username,
        password,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  onLoginSucess = (access, refresh, username) => {
    // user상태 저장
    this.setUser(access, refresh, true);

    // // accessToken 저장
    // localStorage.setItem("access", access);

    // // refresh 값 쿠키로 저장
    // localStorage.setItem("refresh", refresh);

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
    const data = localStorage.getItem("refresh");
    const username = getCookie("username");

    if (data) {
      try {
        const res = await axios.post("/api/user/token/refresh/", {
          refresh: data,
        });
        this.onLoginSucess(res.data.access, res.data.refresh, username);

        return res;
      } catch (error) {
        console.log(error.response);
        return;
      }
    } else {
      return;
    }
  };

  stopStore() {
    stopPersisting(this);
  }

  logout = () => {
    this.setUser("", false);
    removeCookie("username", { path: "/" });
    localStorage.clear();
  };
}
