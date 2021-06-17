import http from "./http-common";

class EmployeeDataService {
  findAllEmployees() {
    return http.get("/employees");
  }
}

export default new EmployeeDataService();
