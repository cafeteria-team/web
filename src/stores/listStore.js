import { observable, action, makeObservable, toJS, computed } from "mobx";
import axios from "../utils/axios";

class ListStore {
  constructor() {}

  //유저리스트
  @observable
  _userList = [];
  _newUserList = [];

  get getUserList() {
    return toJS(this._userList);
  }

  get getNewUserList() {
    return toJS(this._newUserList);
  }

  @action
  callUserList = async (accessToken, page) => {
    try {
      const response = await axios.get(`/api/user?page=${page}&page_size=10`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      this.setUserList(response.data.results);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };

  @action
  setUserList = (body) => {
    this._userList = body;
  };

  @action
  setNewUserList = (body) => {
    this._NewUserList = body;
  };

  @action
  searchForList = async (accessToken) => {
    try {
      const response = await axios.get(`/api/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      this.setNewUserList(response.data.results);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };
}
export default new ListStore();
