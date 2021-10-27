import http from "./http-common";

class PatientCheckDataService {
  findAllPatientChecks() {
    return http.get("/patients-checks");
  }

  findPatientCheckByReservationId(reservationId) {
    return http.get(
      "/patients-reservations/" + reservationId + "/patients-checks"
    );
  }

  findPatientsChecksByDoctorId(doctorId) {
    return http.get("/doctors/" + doctorId + "/patients-checks");
  }

  createNewPatientCheck(newPatientCheck) {
    return http.post("/patients-checks", newPatientCheck);
  }

  updatePatientCheckByLabId(patientCheckId, updatedPatientCheck) {
    return http.put(
      "/patients-checks/" + patientCheckId + "/lab",
      updatedPatientCheck
    );
  }
}

export default new PatientCheckDataService();
