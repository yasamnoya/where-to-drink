<template>
  <div class="card">
    <div v-if="isLoading" class="spinner-border text-light my-3 mx-auto" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div v-if="bar" class="card-body d-md-flex text-start p-4">
      <div class="block-left">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner d-flex">
            <div class="carousel-item active my-auto">
              <img :src="bar.firstPhoto" class="d-block photo" alt="photo" />
            </div>
            <div v-for="photo in bar.photos" :key="photo" class="carousel-item my-auto">
              <img :src="photo" class="d-block photo" alt="photo" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="block-right d-flex flex-column">
        <h1>{{ bar.name }}</h1>
        <h3> {{ bar.rating.toFixed(1) }} | {{ bar.price }}</h3>
        <h5>{{ bar.location.display_address.join('') }}</h5>
        <drink-here :peopleGoing="bar.peopleGoing" :text="true" class="my-auto"></drink-here>
        <button
          v-if="user && bar.peopleGoing.map((user) => user._id).includes(user._id)"
          @click.prevent="removeGoing(bar.id)"
          class="btn btn-dark w-100"
        >
          先不要好了
        </button>
        <dark-btn
          v-else
          @click.prevent="submitGoing(bar.id)"
          text="今晚去這喝！"
          class="w-100"
        ></dark-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DarkBtn from '../components/DarkBtn.vue';
import DrinkHere from '../components/DrinkHere.vue';

export default {
  props: {
    user: null,
  },
  components: {
    DarkBtn,
    DrinkHere,
  },
  data: () => ({
    bar: null,
    isLoading: true,
  }),
  async created() {
    this.isLoading = true;
    try {
      const res = await axios.get(`/bars/${this.$route.params.barId}`);
      this.bar = res.data;
      this.bar.firstPhoto = this.bar.photos.shift();
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
  },
  methods: {
    async submitGoing(barId) {
      if (this.user === null) {
        this.$router.push('/login');
      } else {
        try {
          await axios.post('/goings/', { barId });
          this.bar.peopleGoing.unshift(this.user);
        } catch (e) {
          console.log(e);
        }
      }
    },
    async removeGoing(barId) {
      try {
        await axios.delete(`/goings/${barId}`);
        /* eslint no-underscore-dangle: 0 */
        this.bar.peopleGoing = this.bar.peopleGoing.filter((user) => user._id !== this.user._id);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
.card {
  background-color: rgba(16, 0, 64, 0.5);
}

.card-body {
  gap: 1rem;
}

.photo {
  object-fit: scale-down;
  width: 100%;
  height: 30vw;
  min-height: 400px;
}

@media (min-width: 768px) {
  .block-left {
    width: 40%;
  }
  .block-right {
    width: 60%;
  }
}

@media (max-width: 768px) {
  .block-right {
    margin-top: 1rem;
  }
}
</style>
