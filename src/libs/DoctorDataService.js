import http from "./http-common";

class DoctorDataService {
  findAllDoctors() {
    return http.get("/doctors");
  }

  findDoctorById(id) {
    return http.get("/doctors/" + id);
  }

  createNewDoctor(data) {
    return http.post("/doctors", data);
  }

  updateDoctor(id, data) {
    return http.put("/doctors/" + id, data);
  }

  deactivateDoctor(id) {
    return http.delete("/doctors/" + id + "/deactivate");
  }

  activateDoctor(id) {
    return http.put("/doctors/" + id + "/activate");
  }

  deleteDoctor(id) {
    return http.delete("/doctors/" + id);
  }

  findAllDoctorsList() {
    return http.get("/doctors-list");
  }

  findAllPatientsReservationsOfDoctor(id) {
    return http.get("/doctors/" + id + "/patients-reservations");
  }
}

export default new DoctorDataService();
