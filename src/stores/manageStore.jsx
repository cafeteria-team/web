import { observable, makeObservable, toJS, computed, action } from "mobx";
import axios from "../utils/axios";

export class ManageStore {
  // 편의시설 리스트
  facilityList = [];

  // 유저 편의시설
  userFacilityList = [];

  // 메뉴
  menu = [];

  constructor() {
    makeObservable(this, {
      facilityList: observable,
      userFacilityList: observable,
      menu: observable,
      getFacilityList: computed,
      getUserFacilityList: computed,
      getMenu: computed,
      setFacilityList: action,
      setUserFacilityList: action,
      callFacilityList: action,
      callUserFacilityList: action,
      editFacilityList: action,
      addFacilityList: action,
      addUserFacilityList: action,
      callMenu: action,
      setMenu: action,
      addMenu: action,
      deleteMenu: action,
      editMenu: action,
      postNotice: action,
      callNotice: action,
      callPrice: action,
      editPrice: action,
      deletePrice: action,
      savePrice: action,
    });
  }

  // 편의시설 리스트 불러오기
  get getFacilityList() {
    return toJS(this.facilityList);
  }

  // 편의시설 리스트 불러오기
  get getUserFacilityList() {
    return toJS(this.userFacilityList);
  }

  // 메뉴 불러오기
  get getMenu() {
    return toJS(this.menu);
  }

  // 편의시설 리스트 설정
  setFacilityList = (data) => {
    this.facilityList = data;
  };

  setUserFacilityList = (data) => {
    this.userFacilityList = data;
  };

  setMenu = (data) => {
    this.menu = data;
  };

  // 편의시설 불러오기 api
  callFacilityList = async () => {
    try {
      const response = await axios.get(`/api/facility
        `);
      this.setFacilityList(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 유저 편의시설 불러오기 api
  callUserFacilityList = async (user) => {
    try {
      const response = await axios.get(`/api/facility/join/${user}`);
      this.setUserFacilityList(response.data.store_facility);
      return response;
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  };

  // 편의시설 삭제
  deleteFacilityList = async (id) => {
    try {
      const response = await axios.delete(`/api/facility/${id}`);
      alert("편의시설이 삭제되었습니다.");
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 사용자 편의시설 삭제
  deleteUserFacilityList = async (storeId, id) => {
    try {
      const response = await axios.delete(
        `/api/facility/join/${storeId}/${id}`
      );
      alert("편의시설이 삭제되었습니다.");
      return response;
    } catch (error) {
      throw error;
    }
  };

  //메뉴삭제
  deleteMenu = async (storeId, id) => {
    try {
      const response = await axios.delete(
        `/api/facility/join/${storeId}/${id}`
      );
      alert("편의시설이 삭제되었습니다.");
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 편의시설 수정
  editFacilityList = async (id, category, name) => {
    try {
      const response = await axios.patch(`/api/facility/${id}`, {
        category,
        name,
      });
      alert("편의시설이 변경되었습니다.");
      return response;
    } catch (error) {
      throw error;
    }
  };

  //메뉴 수정
  editMenu = async (menu, time, id, menuId) => {
    try {
      const response = await axios.patch(`/api/menu/${id}/${menuId}`, {
        menus: menu,
        provide_at: time,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  //편의시설 추가
  addFacilityList = async (category, name) => {
    try {
      const response = await axios.post(`/api/facility`, {
        category,
        name,
      });
      alert("편의시설이 추가되었습니다.");
      return response;
    } catch (error) {
      if (error.response.status === 409) {
        alert("이미등록된 편의시설입니다.");
        throw error;
      }
      throw error;
    }
  };

  // 사용자 편의시설 추가
  addUserFacilityList = async (id, user) => {
    try {
      const response = await axios.post(`/api/facility/join/${user}`, {
        facility: id,
      });
      alert("편의시설이 추가되었습니다.");
      return response;
    } catch (error) {
      if (error.response.status === 409) {
        return alert("이미등록된 편의시설입니다.");
      }
      // console.log(error.response);
      return false;
    }
  };

  //메뉴추가
  addMenu = async (menu, time, id) => {
    try {
      const response = await axios.post(`/api/menu/${id}`, {
        menus: menu,
        provide_at: time,
      });

      return response.data;
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  };
  //메뉴불러오기
  callMenu = async (id, date) => {
    try {
      const response = await axios.get(`/api/menu/${id}?provide_at=${date}
      `);
      return response.data;
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  };

  //공지사항 등록
  postNotice = async (content, id) => {
    try {
      const response = await axios.post(`/api/notice/${id}`, {
        subject: "title",
        content,
        view: true,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };
  //공지사항 불러오기
  callNotice = async (id) => {
    try {
      const access = localStorage.getItem("access");
      const response = await axios.get(`/api/notice/${id}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  //가격 리스트 불러오기
  callPrice = async (id) => {
    try {
      const access = localStorage.getItem("access");
      const response = await axios.get(`/api/store/${id}/price`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };
  // 가격 리스트 저장
  savePrice = async (id, price) => {
    try {
      const response = await axios.post(`/api/store/${id}/price`, {
        price,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };
  // 가격 리스트 수정
  editPrice = async (id, price) => {
    try {
      const response = await axios.patch(`/api/store/${id}/price`, {
        price,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };
  // 가격 리스트 삭제
  deletePrice = async (id, price) => {
    try {
      const response = await axios.delete(`/api/store/${id}/price`);
      return response;
    } catch (err) {
      throw err;
    }
  };
}
