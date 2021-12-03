import Vue from 'vue';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
