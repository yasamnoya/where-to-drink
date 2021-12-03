<template>
  <div class="card m-auto">
    <div class="card-header pt-3">
      <h2 class="card-title">登入</h2>
    </div>
    <div class="card-body">
      <div class="m-1">
        <a :href="`${backendUrl}/users/facebook`" class="btn btn-primary login-option"
          > Facebook
        </a>
      </div>
      <div class="m-1">
        <a :href="`${backendUrl}/users/google`" class="btn btn-danger login-option"> Google</a>
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

<style>
.card {
  max-width: 500px;
}
.login-option {
  width: 400px;
  font-size: 20px;
}
</style>
