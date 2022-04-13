import { observable, makeObservable, toJS, computed, action } from "mobx";
import axios from "../utils/axios";

export class ManageStore {
  // 편의시설 리스트
  facilityList = [];

  constructor() {
    makeObservable(this, {
      facilityList: observable,
      getFacilityList: computed,
      setFacilityList: action,
      callFacilityList: action,
    });
  }

  // 편의시설 리스트 불러오기
  get getFacilityList() {
    return toJS(this.facilityList);
  }

  // 편의시설 리스트 설정
  setFacilityList = (data) => {
    this.facilityList = data;
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

  // 편의시설 삭제
  deleteFacilityList = async (id) => {
    try {
      const response = await axios.delete(`/api/facility/${id}`);
      return response;
    } catch (error) {
      console.log(error.response);
      return false;
    }
  };

  //편의시설 추가
  addFacilityList = async (data) => {
    const { category, name } = data;
    try {
      const response = await axios.post(`/api/facility`, {
        category,
        name,
      });
      return response;
    } catch (error) {
      console.log(error.response);
      return false;
    }
  };
}
