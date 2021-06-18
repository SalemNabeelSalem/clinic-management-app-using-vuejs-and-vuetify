import http from "./http-common";

class EmployeeDataService {
  findAllEmployees() {
    return http.get("/employees");
  }

  deleteEmployee(id) {
    return http.delete("/employees/" + id);
  }
}

export default new EmployeeDataService();
