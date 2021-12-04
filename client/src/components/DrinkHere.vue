<template>
  <div>
    <img v-for="person in peopleGoing" :key="person.id" :src="person.avatarUrl" />
    <span v-if="text"></span>
    今晚會在這裡喝
  </div>
</template>

<script>
export default {
  props: {
    peopleGoing: [],
    text: Boolean,
  },
};
</script>

<style scoped>
img {
  width: 24px;
  height: 24px;
  border-radius: 24px;
}
</style>
