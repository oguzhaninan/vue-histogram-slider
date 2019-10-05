import Vue from "vue";
window.$ = require("jquery");
window.JQuery = require("jquery");
import App from "./HistogramSlider.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
