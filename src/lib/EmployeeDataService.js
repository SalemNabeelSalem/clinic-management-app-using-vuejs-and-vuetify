import http from "./http-common";

class EmployeeDataService {
  findAllEmployees() {
    return http.get("/employees");
  }

  createNewEmployee(data) {
    return http.post("/employees", data);
  }

  updateEmployee(id, data) {
    return http.put("/employees/" + id, data);
  }

  deleteEmployee(id) {
    return http.delete("/employees/" + id);
  }
}

export default new EmployeeDataService();
