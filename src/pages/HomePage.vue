<template>
  <!-- AD 1 -->
  <section class="row adContainer d-flex flex-column align-items-center p-0 m-0 animate__animated animate__fadeInDown">
    <div class="col-6 d-flex flex-column align-items-center">
      <img :src="adOne" alt="" height="165" class="mt-4 rounded border elevation-5 ads">
    </div>
  </section>
  <!-- FORM COMPONENT -->
  <section class="form-container d-flex flex-column align-items-center animate__animated animate__fadeInDown"
    v-if="account.id">
    <PostForm />
  </section>
  <!-- SEARCH COMPONENT -->
  <section class="row p-0 m-0 d-flex flex-row justify-content-center animate__animated animate__fadeInDown">
    <SearchBar />
  </section>
  <!-- AD 2 -->
  <section class="row adContainer d-flex flex-column align-items-center p-0 m-0 animate__animated animate__fadeInDownBig">
    <div class="col-6 d-flex flex-column align-items-center">
      <img :src="adTwo" alt="" height="165" class="mt-4 rounded border elevation-5 ads">
    </div>
  </section>
  <!-- POST COMPONENT -->
  <section class="row p-0 m-0 justify-content-center position-relative animate__animated animate__fadeIn"
    v-for="post in posts" :key="post.id">
    <div class="col-12 col-md-6 p-0 m-0 mt-4 ">
      <!-- PASSED IN POST PROP -->
      <Post :post="post" v-if="post" />
    </div>
  </section>
  <!-- PAGNATION BUTTONS -->
  <section class="row p-0 m-0">
    <PaginationButtons />
  </section>
</template>

<script>
import { logger } from '../utils/Logger.js'
import { postsService } from '../services/postsService.js'
import Pop from '../utils/Pop.js'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState.js'

export default {
  setup() {
    // GET ADS FUNCTION
    async function getAds() {
      // logger.log('GETTING ADS');
      await postsService.getAds();
    }
    // GET POSTS
    async function getPosts() {
      try {
        // logger.log('[HOME / GETTING POSTS 🔎]');
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => { getPosts(); });
    onMounted(() => { getAds(); });
    return {
      adOne: computed(() => AppState.adOne),
      adTwo: computed(() => AppState.adTwo),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
    };
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .ads {
    height: 85px;
  }
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
}

.home-card {
  width: 50vw;
}

.img {
  height: 200px;
  max-width: 200px;
  width: 100%;
  object-fit: contain;
  object-position: center;
}
</style>