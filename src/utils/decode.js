import jwt_decode from "jwt-decode";

class Decode {
  constructor() {
    this.token = "";
  }

  getUserId(access) {
    this.token = access;
    return jwt_decode(this.token);
  }
}

export default Decode;
