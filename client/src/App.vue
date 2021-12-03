<template>
  <div id="app">
    <Nav :user="user" />
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
import Nav from './components/Nav.vue';

export default {
  data: () => ({
    user: null,
  }),
  components: {
    Nav,
  },
  async created() {
    try {
      const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/users/me`);
      this.user = res.data;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
  background: #c33764; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #1d2671, #c33764); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #1d2671,
    #ad5389
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-width: 100vw;
  min-height: 100vh;
}
</style>
