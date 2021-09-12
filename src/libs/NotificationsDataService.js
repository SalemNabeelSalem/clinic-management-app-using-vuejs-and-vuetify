import http from "./http-common";

class NotificationsDataService {
  sendEmailMessage(data) {
    return http.post("/notifications/send-email", data);
  }
}

export default new NotificationsDataService();
