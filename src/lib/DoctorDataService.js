import http from "./http-common";

class DoctorDataService {
  findAllDoctors() {
    return http.get("/doctors");
  }

  createNewDoctor(data) {
    return http.post("/doctors", data);
  }

  updateDoctor(id, data) {
    return http.put("/doctors/" + id, data);
  }

  deleteDoctor(id) {
    return http.delete("/doctors/" + id);
  }
}

export default new DoctorDataService();
