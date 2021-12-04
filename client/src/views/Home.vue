<template>
  <div>
    <div class="d-flex">
      <input
        v-model="location"
        @keyup.enter="search"
        type="text"
        placeholder="位址、地標..."
        class="form-control me-2"
        :class="isLoading ? 'disabled' : ''"
      />
      <dark-btn @click="search" text="搜尋" :class="isLoading ? 'disabled' : ''" />
    </div>

    <div class="container w-100 mt-4">
      <div class="row m-auto">
        <div v-for="bar in bars" :key="bar.id" class="col-xxl-3 col-lg-4 col-md-6 col-12">
          <div class="card m-auto p-3 my-3 text-start">
            <router-link :to="`/bars/${bar.id}`" class="w-100 h-50">
              <img
                :src="bar.image_url"
                @error="
                  bar.image_url =
                    'https://image.freepik.com/free-vector/bar-interior-realistic-composition_1284-24320.jpg'
                "
                :alt="bar.name"
                class="w-100 h-100"
              />
            </router-link>
            <router-link :to="`/bars/${bar.id}`" class="bar-title">
              <h3 class="mt-4">{{ bar.name }}</h3>
            </router-link>
            <div class="my-auto"></div>
            <p v-if="bar.peopleGoing">趕快揪團來這裡喝</p>
            <div class="d-flex justify-content-between">
              <p> {{ bar.rating.toFixed(1) }}</p>
              <p>{{ calculateDistance(bar.distance) }}</p>
            </div>
            <div class="row"></div>
            <dark-btn text="今晚去這喝！"></dark-btn>
          </div>
        </div>
      </div>

      <div v-if="this.isLoading" class="spinner-border text-light my-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <dark-btn
      v-if="bars.length < barMaxCount"
      @click.prevent="loadMoreBars"
      text="下一頁"
      class="w-100"
      :class="isLoading ? 'disabled' : ''"
    ></dark-btn>
  </div>
</template>

<script>
import axios from 'axios';
import DarkBtn from '../components/DarkBtn.vue';

export default {
  name: 'Home',
  data: () => ({
    position: null,
    isLoading: false,
    location: '',
    resultBasedOn: '',
    bars: [],
    barMaxCount: -1,
  }),
  components: {
    DarkBtn,
  },
  async created() {
    if (localStorage.resultBasedOn) {
      this.location = localStorage.resultBasedOn;
      await this.getBars(localStorage.resultBasedOn);
    }
  },
  methods: {
    async getBars(location) {
      this.isLoading = true;
      try {
        const res = await axios.get('/bars', { params: { location } });
        this.bars = res.data.businesses;
        this.resultBasedOn = location;
        localStorage.resultBasedOn = this.resultBasedOn;
        this.barMaxCount = res.data.total;
      } catch (e) {
        console.log(e);
      }
      this.isLoading = false;
    },
    async search() {
      if (this.location) {
        this.bars = [];
        this.barMaxCount = -1;
        await this.getBars(this.location);
      }
    },
    async loadMoreBars() {
      try {
        this.isLoading = true;
        const res = await axios.get('/bars', {
          params: { location: this.resultBasedOn, offset: this.bars.length },
        });
        this.bars = this.bars.concat(res.data.businesses);
      } catch (e) {
        console.log(e);
      }
      this.isLoading = false;
    },
    async getPosition() {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition((position) => {
        this.position = position;
        console.log(this.position.coords);
      });
    },
    calculateDistance(distance) {
      if (distance < 1000) return `${Math.round(distance)} m`;
      return `${(distance / 1000).toFixed(2)} km`;
    },
  },
};
</script>

<style scoped>
.card {
  background-color: rgba(16, 0, 64, 0.5);
}
.card img {
  object-fit: cover;
}
@media (min-width: 768px) {
  .card {
    height: 60vh;
  }
}

.bar-title {
  color: whitesmoke;
  text-decoration: none !important;
}
</style>
