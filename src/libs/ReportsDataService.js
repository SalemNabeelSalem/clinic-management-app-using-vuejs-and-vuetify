import http from "./http-common";

class ReportsDataService {
  usersChartData() {
    return http.get("/reports/users-chart-data");
  }

  patientsReservationsChartData() {
    return http.get("reports/patients-reservations-chart-data");
  }
}

export default new ReportsDataService();
