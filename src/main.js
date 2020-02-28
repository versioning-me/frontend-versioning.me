import Vue from "vue";
import App from "./App.vue";
import VueHead from "vue-head";

import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios)

// vue-head
Vue.use(VueHead);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

// v-scroll
Vue.directive("scroll", {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  }
});
