import { observable, makeObservable, toJS, computed, action } from "mobx";
import axios from "../utils/axios";

export class ManageStore {
  // 편의시설 리스트
  facilityList = [];

  // 유저 편의시설
  userFacilityList = [];

  constructor() {
    makeObservable(this, {
      facilityList: observable,
      userFacilityList: observable,
      getFacilityList: computed,
      getUserFacilityList: computed,
      setFacilityList: action,
      setUserFacilityList: action,
      callFacilityList: action,
      callUserFacilityList: action,
      editFacilityList: action,
      addFacilityList: action,
      addUserFacilityList: action,
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

  // 편의시설 리스트 설정
  setFacilityList = (data) => {
    this.facilityList = data;
  };

  setUserFacilityList = (data) => {
    this.userFacilityList = data;
  };

  // 편의시설 불러오기 api
  callFacilityList = async () => {
    try {
      const response = await axios.get(`/api/facility
        `);
      this.setFacilityList(response.data);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // 유저 편의시설 불러오기 api
  callUserFacilityList = async (user) => {
    try {
      const response = await axios.get(`/api/facility/join/${user}`);
      this.setUserFacilityList(response.data.store_facility);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // 편의시설 삭제
  deleteFacilityList = async (id) => {
    try {
      const response = await axios.delete(`/api/facility/${id}`);
      alert("편의시설이 삭제되었습니다.");
      return response;
    } catch (error) {
      console.log(error, error.response);
      return false;
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
      console.log(error, error.response);
      return false;
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
      alert("편의시설이 이미 등록되있거나 잘못된 입력입니다.");
      return false;
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
        return alert("이미등록된 편의시설입니다.");
      }
      console.log(error.response);
      return false;
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
}
