import { action, makeObservable } from "mobx";
import axios from "../utils/axios";

export class NoticeStore {
  rootStore;

  constructor(root) {
    makeObservable(this, {
      callNotice: action,
      postNotice: action,
      editNotice: action,
      deleteNotice: action,
    });

    this.rootStore = root;
  }

  //공지사항 불러오기
  callNotice = () => {
    try {
      const response = axios.get("/api/notice/admin");
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
