import Vue from "vue";
import VueRouter from "vue-router";

// Viwes Importing:-
import Home from "../views/Home"; // or Home.vue
import ManagerDashboard from "../views/ManagerDashboard";
import ReceptionistDashboard from "../views/ReceptionistDashboard";
import DoctorDashboard from "../views/DoctorDashboard";
import LaboratoryDashboard from "../views/LaboratoryDashboard";

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
import PatientsChecks from "../components/doctor-dashboard/PatientsChecks";

// Laboratory-Dashboard Components Importing:-
import PatientsDignostic from "../components/laboratory-dashboard/PatientsDignostic";

import RecepLogin from "../components/ReceptionistLogin";
import LabLogin from "../components/LabLogin";
import DoctorLogin from "../components/DoctorLogin";
import ManagerLogin from "../components/ManagerLogin";

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
      {
        path: "/doctor-dashboard/:doctorId/patients-checks",
        name: "PatientsChecks",
        component: PatientsChecks,
      },
    ],
  },
  {
    path: "/laboratory-dashboard/:labId",
    name: "LaboratoryDashboard",
    component: LaboratoryDashboard,
    children: [
      {
        path: "/laboratory-dashboard/:labId/patients-dignostics",
        name: "PatientsDignostic",
        component: PatientsDignostic,
      },
    ],
  },
  {
    path: "/recep-login",
    name: "RecepLogin",
    component: RecepLogin,
  },
  {
    path: "/lab-login",
    name: "LabLogin",
    component: LabLogin,
  },
  {
    path: "/doctor-login",
    name: "DoctorLogin",
    component: DoctorLogin,
  },
  {
    path: "/manager-login",
    name: "ManagerLogin",
    component: ManagerLogin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = "B5-IT Final Project - Clinic App";
  next();
});

export default router;
