import http from "./http-common";

class LaboratoryDataService {
  findAllLaboratories() {
    return http.get("/laboratories");
  }

  createNewLaboratory(data) {
    return http.post("/laboratories", data);
  }

  updateLaboratory(id, data) {
    return http.put("/laboratories/" + id, data);
  }

  deactivateLaboratory(id) {
    return http.delete("/laboratories/" + id + "/deactivate");
  }

  activateLaboratory(id) {
    return http.put("/laboratories/" + id + "/activate");
  }

  deleteLaboratory(id) {
    return http.delete("/laboratories/" + id);
  }
}

export default new LaboratoryDataService();
