<template>
  <nav class="navbar navbar-expand-md navbar-dark">
    <div class="container-fluid w-75 mx-auto">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.png" class="logo" alt="Logo" />
        今晚哪裡喝</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="ms-auto">
          <ul class="navbar-nav mb-2 mb-md-0">
            <li v-if="user" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img :src="user.avatarUrl" id="avatar" alt="avatar" class="rounded-circle" />
                {{ user.username }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" :href="`${backendUrl}/users/logout`">登出</a></li>
              </ul>
            </li>
            <router-link v-if="!user" to="/login" class="btn btn-light">登入</router-link>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    user: null,
  },
  data: () => ({
    backendUrl: process.env.VUE_APP_BACKEND_URL,
  }),
};
</script>

<style scoped>
nav {
  background-color: rgba(0, 0, 0, 0.2);
}

.btn-light {
  background-color: rgba(255, 255, 255, 0.9);
  color: rgba(0, 0, 0, 0.8);
  border: none;
}

.dropdown-menu {
  color: whitesmoke;
  background-color: rgba(16, 0, 64, 0.8);
}

.dropdown-item {
  color: whitesmoke;
}

.dropdown-item:hover {
  color: whitesmoke;
  background-color: rgba(10, 0, 64, 1);
}

#avatar {
  width: 36px;
  height: 36px;
}

.logo {
  width: 48px;
  height: 48px;
}
</style>
