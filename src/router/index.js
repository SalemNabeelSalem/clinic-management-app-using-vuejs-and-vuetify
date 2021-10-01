import Vue from "vue";
import VueRouter from "vue-router";

// views importing:-
import Home from "../views/Home"; // or Home.vue
import ManagerDashboard from "../views/ManagerDashboard";
import ReceptionistDashboard from "../views/ReceptionistDashboard";

// components importing:-
import Receptionists from "../components/Receptionists";
import Doctors from "../components/Doctors";
import Laboratories from "../components/Laboratories";
import Managers from "../components/Managers";
import PatientsReservations from "../components/PatientsReservations";
import PatientsReservationsReports from "../components/PatientsReservationsReports";
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
      {
        path: "/recep-dashboard/:recepId/patients-reservations-reports",
        name: "PatientsReservationsReports",
        component: PatientsReservationsReports,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
