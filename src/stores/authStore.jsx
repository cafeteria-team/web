import { observable, action, computed, makeObservable, toJS } from "mobx";
import axios from "../utils/axios";
import Decode from "../utils/decode";

class User {
  userId;
  userName;
  userRole;

  constructor(userId, userName, userRole) {
    this.userId = userId;
    this.userName = userName;
    this.userRole = userRole;
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
        // onSilentRefresh: action,
        logout: action,
        getUserName: action,
        initializeUser: action,
      }
    );
    // rootStore를 받는다.
    this.rootStore = root;

    this.user = new User("", "", "");

    this.decode = new Decode();
  }

  get getUser() {
    return toJS(this.user);
  }

  initializeUser(id, name, role) {
    this.user = new User(id, name, role);
  }

  getUserName = (userId) => {
    try {
      const response = axios.get(`/api/user/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 업체명 설정
  setUser = (access) => {
    const { user_id } = this.decode.getUserId(access);
    const { user_role } = this.decode.getUserId(access);
    const { user_name } = this.decode.getUserId(access);
    this.user = new User(user_id, user_name, user_role);
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

  onLoginSucess = (access, refresh) => {
    // accessToken 저장
    localStorage.setItem("access", access);

    // refresh 값 쿠키로 저장
    localStorage.setItem("refresh", refresh);

    const { exp } = this.decode.getUserId(access);

    localStorage.setItem("expireAt", exp);

    axios.headers["Authorization"] = `Bearer ${access}`;
  };

  logout = () => {
    this.initializeUser("", "", "");
    localStorage.clear();
  };
}
