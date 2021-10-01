import http from "./http-common";

class ManagerDataService {
  findAllManagers() {
    return http.get("/managers");
  }

  createNewManager(data) {
    return http.post("/managers", data);
  }

  updateManager(id, data) {
    return http.put("/managers/" + id, data);
  }

  deactivateManager(id) {
    return http.delete("/managers/" + id + "/deactivate");
  }

  activateManager(id) {
    return http.put("/managers/" + id + "/activate");
  }

  deleteManager(id) {
    return http.delete("/managers/" + id);
  }
}

export default new ManagerDataService();
