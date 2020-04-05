const jwtDecode = require("jwt-decode");

class JWT {
  setJWt(jwt) {
    localStorage.setItem("jwt", jwt);
  }
  logout() {
    localStorage.clear();
  }
  getId() {
    const data = jwtDecode(localStorage.getItem("jwt"));
    return data.id;
  }
  getAuthHeader() {
    return { Authorization: "Bearer " + localStorage.getItem("jwt") };
  }
  getJWT() {
    return localStorage.getItem("jwt");
  }
  setBoarded(isBoarded) {
    localStorage.setItem("isBoarded", isBoarded);
  }
  getBoarded() {
    return localStorage.getItem("isBoarded");
  }
}

export default new JWT();
