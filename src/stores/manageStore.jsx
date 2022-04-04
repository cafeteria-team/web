import { observable, action, makeObservable } from "mobx";
import axios from "../utils/axios";

// class ManageStore {
//   constructor() {
//     makeObservable(this);
//   }

//   //식당 메뉴리스트
//   @observable
//   _menuList = [];

//   //식당 편의시설 리스트
//   @observable
//   _facilitiesList = [];

//   //식당 공지사항
//   @observable
//   _notice = "";

//   //식당 메뉴리스트 값얻기
//   get menuList() {
//     return this._menuList;
//   }

//   //식당 편의시설 리스트 값얻기
//   get facilitiesList() {
//     return this._facilitiesList;
//   }

//   //식당 공지사항 값얻기
//   get notice() {
//     return this._notice;
//   }

//   //식당 메뉴리스트 값설정
//   @action
//   setMenuList = (list) => {
//     this._menuList = list;
//   };

//   //식당 편의시설리스트 값설정
//   @action
//   setFacilitiesList = (list) => {
//     this._facilitiesList = list;
//   };

//   //식당 공지사항
//   @action
//   setNotice = (notice) => {
//     this._notice = notice;
//   };

//   //식당 편의시설 불러오기
//   @action
//   getFacilitiesList = async (storeId) => {
//     try {
//       const response = await axios.get(`api/facility/${storeId}`);
//       return response;
//     } catch (error) {
//       console.log(error.response);
//     }
//   };
// }

// export default new ManageStore();

export class ManageStore {
  constructor() {}
}
