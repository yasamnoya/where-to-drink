<template>
  <button @click="$emit('click', $event)" class="btn btn-purple">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style scpoed>
.btn-purple,
.btn-purple:hover {
  color: whitesmoke;
}
.btn-purple {
  background-color: rgba(20, 0, 64, 0.8);
  min-width: 64px;
}
.btn-purple:hover {
  background-color: rgba(16, 0, 64, 1);
}
</style>
