import VueClipboard from "vue-clipboard2";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue, { BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueClipboard)
// VueClipboard.config.autoSetContainer = true


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
