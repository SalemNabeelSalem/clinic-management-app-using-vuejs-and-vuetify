import http from "./http-common";

class LoginDataService {
  receptionistLogin(email, password) {
    return http.post("/recep-login", { email, password });
  }

  labLogin(email, password) {
    return http.post("/lab-login", { email, password });
  }

  doctorLogin(email, password) {
    return http.post("/lab-login", { email, password });
  }

  managerLogin(email, password) {
    return http.post("/manager-login", { email, password });
  }
}

export default new LoginDataService();
