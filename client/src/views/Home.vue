<template>
  <div class="mx-auto w-75">
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
            <img
              :src="bar.image_url"
              @error="
                bar.image_url =
                  'https://image.freepik.com/free-vector/bar-interior-realistic-composition_1284-24320.jpg'
              "
              :alt="bar.name"
              class="w-100"
            />
            <h3 class="mt-4">{{ bar.name }}</h3>
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
  methods: {
    async search() {
      if (this.location) {
        try {
          this.isLoading = true;
          const res = await axios.get('/bars', { params: { location: this.location } });
          this.bars = res.data.businesses;
          this.resultBasedOn = this.location;
          this.barMaxCount = res.data.total;
        } catch (e) {
          console.log(e);
        }
        this.isLoading = false;
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
  width: 100%;
  height: 50%;
}
@media (min-width: 768px) {
  .card {
    height: 60vh;
  }
}
</style>
