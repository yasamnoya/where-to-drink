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
        <dark-btn text="今晚來這喝！" class="w-100 mt-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DarkBtn from '../components/DarkBtn.vue';

export default {
  components: {
    DarkBtn,
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
      console.log(this.bar);
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
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
