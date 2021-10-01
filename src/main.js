import vue from "vue";
import app from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import chartkick from "./plugins/chartkick";
import bootstrap from "./plugins/bootstrap-vue";

vue.config.productionTip = false;

new vue({
  router,
  store,
  vuetify,
  chartkick,
  bootstrap,
  render: (h) => h(app),
}).$mount("#app");
