import Vue from "vue";
import VueRouter from "vue-router";

// Viwes Importing:-
import Home from "../views/Home"; // or Home.vue
import ManagerDashboard from "../views/ManagerDashboard";
import ReceptionistDashboard from "../views/ReceptionistDashboard";
import DoctorDashboard from "../views/DoctorDashboard";

// Manager-Dashboard Components Importing:-
import Receptionists from "../components/manager-dashboard/Receptionists";
import Doctors from "../components/manager-dashboard/Doctors";
import Laboratories from "../components/manager-dashboard/Laboratories";
import Managers from "../components/manager-dashboard/Managers";
import Reports from "../components/manager-dashboard/Reports";

// Recepionist-Dashboard Components Importing:-
import PatientsReservations from "../components/receptionist-dashboard/PatientsReservations";

// Doctor-Dashboard Components Importing:-
import PatientsReservationsOfDoctor from "../components/doctor-dashboard/PatientsReservations";
import PatientCheck from "../components/doctor-dashboard/PatientCheck";

import Login from "../components/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/manager-dashboard",
    name: "Manager-Dashboard",
    component: ManagerDashboard,
    children: [
      {
        path: "/manager-dashboard/receptionists",
        name: "Receptionists",
        component: Receptionists,
      },
      {
        path: "/manager-dashboard/doctors",
        name: "Doctors",
        component: Doctors,
      },
      {
        path: "/manager-dashboard/laboratories",
        name: "Laboratories",
        component: Laboratories,
      },
      {
        path: "/manager-dashboard/managers",
        name: "Managers",
        component: Managers,
      },
      {
        path: "/manager-dashboard/reports",
        name: "Reports",
        component: Reports,
      },
    ],
  },
  {
    path: "/recep-dashboard/:recepId",
    name: "Receptionist-Dashboard",
    component: ReceptionistDashboard,
    children: [
      {
        path: "/recep-dashboard/:recepId/patients-reservations",
        name: "PatientsReservations",
        component: PatientsReservations,
      },
    ],
  },
  {
    path: "/doctor-dashboard/:doctorId",
    name: "DoctorDashboard",
    component: DoctorDashboard,
    children: [
      {
        path: "/doctor-dashboard/:doctorId/patients-reservations",
        name: "PatientsReservationsOfDoctor",
        component: PatientsReservationsOfDoctor,
      },
      {
        path: "/doctor-dashboard/:doctorId/patients-reservations/:reservationId/check",
        name: "PatientCheck",
        component: PatientCheck,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
