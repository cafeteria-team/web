import { observable, action, makeObservable, toJS, computed } from "mobx";
import axios from "../utils/axios";

class ListStore {
  constructor() {
    makeObservable(this);
  }

  //유저리스트
  @observable
  _userList = [];

  get getUserList() {
    return toJS(this._userList);
  }

  // call userList
  @action
  callUserList = async (accessToken) => {
    try {
      const response = await axios.get(`/api/user`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });
      console.log(response);
      this.setUserList(response.data.results);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };

  // set userList
  @action
  setUserList = (body) => {
    this._userList = body;
  };

  // delete userList
  @action
  deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/user/${userId}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };

  // get selected edituserList
  @action
  getEditUser = async (userId, accessToken) => {
    try {
      const response = await axios.get(`/api/user/${userId}`, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };
  //edit userList
  @action
  editUser = async (userId, data) => {
    try {
      const { email, name, busi_num, busi_num_img } = data;
      const response = await axios.patch(`/api/user/${userId}`, {
        email,
        store: {
          name,
          busi_num,
          busi_num_img,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };

  @action
  approveUser = async (userId, data) => {
    try {
      const response = await axios.patch("/api/user/" + userId + "/approve", {
        is_active: data,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };
}
export default new ListStore();
