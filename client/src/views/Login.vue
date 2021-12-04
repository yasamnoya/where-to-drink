<template>
  <div class="d-flex flex-column p-0 wrapper">
    <div class="card m-auto">
      <div class="card-header pt-3">
        <h1 class="card-title">登入</h1>
      </div>
      <div class="card-body">
        <div class="m-2">
          <a :href="`${backendUrl}/users/facebook`" class="btn btn-primary login-option"
            > Facebook
          </a>
        </div>
        <div class="m-2">
          <a :href="`${backendUrl}/users/google`" class="btn btn-danger login-option"> Google</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    backendUrl: process.env.VUE_APP_BACKEND_URL,
  }),
};
</script>

<style scoped>
.wrapper {
  height: 60vh;
}

.card {
  background-color: rgba(16, 0, 64, 0.5);
  width: 50vw;
  min-width: 250px;
}
.login-option {
  width: 80%;
  font-size: 1.2em;
}
</style>
