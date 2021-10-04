import http from "./http-common";

class PatientReservationDataService {
  findAllPatientsReservationsByReceptionistId(id) {
    return http.get("/receptionists/" + id + "/patients-reservations");
  }

  createNewPatientReservation(id, data) {
    return http.post("/receptionists/" + id + "/patients-reservations", data);
  }

  updatePatientReservation(receptionistId, patientReservationId, data) {
    return http.put(
      "/receptionists/" +
        receptionistId +
        "/patients-reservations/" +
        patientReservationId,
      data
    );
  }

  deletePatientReservation(receptionistId, patientReservationId) {
    return http.delete(
      "/receptionists/" +
        receptionistId +
        "/patients-reservations" +
        patientReservationId
    );
  }
}

export default new PatientReservationDataService();
