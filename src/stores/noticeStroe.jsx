import { action, makeObservable, observable, toJS, computed } from "mobx";
import axios from "../utils/axios";

export class NoticeStore {
  rootStore;

  noticeList = [];

  constructor(root) {
    makeObservable(this, {
      noticeList: observable,
      getNoticeList: computed,
      setNoticeList: action,
      callNotice: action,
      postNotice: action,
      editNotice: action,
      deleteNotice: action,
    });

    this.rootStore = root;
  }
  get getNoticeList() {
    return toJS(this.noticeList);
  }

  // 유저 정보 설정
  setNoticeList = (data) => {
    this.noticeList = data;
  };

  //공지사항 불러오기
  callNotice = () => {
    const access = localStorage.getItem("access");
    try {
      const response = axios.get("/api/notice/admin", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  //공지사항 등록
  postNotice = (subject, content, view) => {
    try {
      const response = axios.post("/api/notice/admin", {
        subject,
        content,
        view,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  //공지사항 수정
  editNotice = (subject, content, view, noticeId) => {
    try {
      const response = axios.patch(`/api/notice/admin/${noticeId}`, {
        subject,
        content,
        view,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  //공지사항 삭제
  deleteNotice = (noticeId) => {
    try {
      const response = axios.delete(`/api/notice/admin/${noticeId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
