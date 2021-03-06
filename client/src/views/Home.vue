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
            <div class="my-auto py-2">
              <drink-here
                v-if="bar.peopleGoing.length"
                :peopleGoing="bar.peopleGoing"
                :text="true"
              ></drink-here>
            </div>
            <div class="d-flex justify-content-between">
              <p> {{ bar.rating.toFixed(1) }}</p>
              <p>{{ calculateDistance(bar.distance) }}</p>
            </div>
            <div class="row"></div>
            <button
              v-if="user && bar.peopleGoing.map((user) => user._id).includes(user._id)"
              @click.prevent="removeGoing(bar.id)"
              class="btn btn-dark w-100"
            >
              先不要好了
            </button>
            <dark-btn v-else @click.prevent="submitGoing(bar.id)" text="今晚去這喝！"></dark-btn>
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
import DrinkHere from '../components/DrinkHere.vue';

export default {
  name: 'Home',
  props: {
    user: null,
  },
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
    DrinkHere,
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
    async submitGoing(barId) {
      if (this.user === null) {
        this.$router.push('/login');
      } else {
        try {
          await axios.post('/goings/', { barId });
          const barGoing = this.bars.filter((bar) => bar.id === barId)[0];
          barGoing.peopleGoing.unshift(this.user);
        } catch (e) {
          console.log(e);
        }
      }
    },
    async removeGoing(barId) {
      try {
        await axios.delete(`/goings/${barId}`);
        const barGoing = this.bars.filter((bar) => bar.id === barId)[0];
        /* eslint no-underscore-dangle: 0 */
        barGoing.peopleGoing = barGoing.peopleGoing.filter((user) => user._id !== this.user._id);
      } catch (e) {
        console.log(e);
      }
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
