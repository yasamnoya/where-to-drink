<template>
  <nav class="navbar navbar-expand-md navbar-dark">
    <div class="container-fluid w-75 mx-auto">
      <router-link class="navbar-brand" to="/">今晚哪裡喝</router-link>
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
        <ul class="navbar-nav mx-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link" :class="$route.path == '/' ? 'active' : ''" to="/"
              >找地方喝！</router-link
            >
          </li>
        </ul>
        <div class="">
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
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" :href="`${backendUrl}/users/logout`">登出</a></li>
              </ul>
            </li>
            <router-link v-if="!user" to="/login" class="btn btn-primary">登入</router-link>
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

<style>
nav {
  background-color: rgba(0, 0, 0, 0.2);
}
#avatar {
  width: 36px;
  height: 36px;
}
</style>
