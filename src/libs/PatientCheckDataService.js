import http from "./http-common";

class PatientCheckDataService {
  findPatientCheckByReservationId(reservationId) {
    return http.get(
      "/patients-reservations/" + reservationId + "/patients-checks"
    );
  }
}

export default new PatientCheckDataService();
