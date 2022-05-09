import { AuthStore } from "./authStore.jsx";
import { ListStore } from "./listStore.jsx";
import { ManageStore } from "./manageStore.jsx";
import { NoticeStore } from "./noticeStroe";

export class RootStore {
  AuthStore;

  constructor() {
    //모든 store를 생성자로 불러온다
    this.AuthStore = new AuthStore(this);
    this.ListStore = new ListStore(this);
    this.ManageStore = new ManageStore(this);
    this.NoticeStore = new NoticeStore(this);
  }
}
