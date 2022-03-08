import { observable, action, makeObservable, toJS, computed } from "mobx";
import axios from "../utils/axios";

class ListStore {
  constructor() {}

  //유저리스트
  @observable
  _userList = [];

  get getUserList() {
    return toJS(this._userList);
  }

  @action
  callUserList = async (accessToken, page) => {
    console.log(accessToken);
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
}
export default new ListStore();
