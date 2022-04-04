import { AuthStore } from "./authStore.jsx";
import { ListStore } from "./listStore.jsx";
import { ManageStore } from "./manageStore.jsx";

export class RootStore {
  AuthStore;

  constructor() {
    //모든 store를 생성자로 불러온다
    this.AuthStore = new AuthStore(this);
    this.ListStore = new ListStore(this);
    this.ManageStore = new ManageStore(this);
  }
}
