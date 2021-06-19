import Vue from "vue";
import VueRouter from "vue-router";

// views importing:-
import Home from "../views/Home"; // or Home.vue
import Manager from "../views/Manager";

// components importing:-
import Employees from "../components/Employees";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/manager",
    name: "Manager",
    component: Manager,
    children: [
      {
        path: "/manager/employees",
        name: "Employees",
        component: Employees,
      },
    ],
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
