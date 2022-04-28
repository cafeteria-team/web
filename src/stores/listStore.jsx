import { observable, action, makeObservable, toJS, computed } from "mobx";
import axios from "../utils/axios";
export class ListStore {
  rootStore;

  // 유저리스트
  userList = [];

  constructor(root) {
    makeObservable(this, {
      userList: observable,
      getUserList: computed,
      setUserList: action,
      callUserList: action,
      getEditUser: action,
      editUser: action,
      approveUser: action,
    });
    this.rootStore = root;
  }

  // 유저 정보 불러오기
  get getUserList() {
    return toJS(this.userList);
  }

  // 유저 정보 설정
  setUserList = (data) => {
    this.userList = data;
  };

  // 유저 정보 API 불러오기
  callUserList = async () => {
    try {
      const access = localStorage.getItem("access");
      const response = await axios.get(`/api/user`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      this.setUserList(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 유저 정보 삭제
  deleteUser = async (userId) => {
    try {
      const access = localStorage.getItem("access");
      const response = await axios.delete(`/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      alert("유저를 삭제하는데 실패했습니다.");
      throw error;
    }
  };

  // 선택 유저 정보 수정
  getEditUser = async (userId, accessToken) => {
    try {
      const response = await axios.get(`/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 유저 정보 수정
  editUser = async (userId, data) => {
    try {
      const access = localStorage.getItem("access");
      // const { email, name, busi_num, busi_num_img } = data;
      const response = await axios.patch(
        `/api/user/${userId}`,
        {
          email: data.email,
          store: {
            name: data.store.name,
            busi_num: data.store.busi_num,
            busi_num_img: data.store.busi_num_img,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 유저 승인
  approveUser = async (userId, data) => {
    try {
      const response = await axios.patch("/api/user/" + userId + "/approve", {
        is_active: data,
      });
      return response;
    } catch (error) {
      console.log(error.response);
      return;
    }
  };
}
