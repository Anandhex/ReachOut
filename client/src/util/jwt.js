class JWT {
  setJWt(jwt) {
    localStorage.setItem("jwt", jwt);
  }
  logout() {
    localStorage.clear();
  }
  getAuthHeader() {
    return { Authorization: "Bearer " + localStorage.getItem("jwt") };
  }
  getJWT() {
    return localStorage.getItem("jwt");
  }
}

export default new JWT();
