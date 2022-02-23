import { observable, action, makeObservable, toJS, computed } from "mobx";
import axios from "../utils/axios";

class AuthStore {
  constructor() {
    makeObservable(this);
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

  @action
  async login(body) {
    const { username, password } = body;
    try {
      const response = await axios.post("/api/user/login", {
        username,
        password,
      });
      this.setUsername(username);
      return response;
    } catch (error) {
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
