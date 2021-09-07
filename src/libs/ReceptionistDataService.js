import http from "./http-common";

class ReceptionistDataService {
  findAllReceptionists() {
    return http.get("/receptionists");
  }

  createNewReceptionist(data) {
    return http.post("/receptionists", data);
  }

  updateReceptionist(id, data) {
    return http.put("/receptionists/" + id, data);
  }

  deactivateReceptionist(id) {
    return http.delete("/receptionists/" + id + "/deactivate");
  }

  activateReceptionist(id) {
    return http.put("/receptionists/" + id + "/activate");
  }

  deleteReceptionist(id) {
    return http.delete("/receptionists/" + id);
  }
}

export default new ReceptionistDataService();
