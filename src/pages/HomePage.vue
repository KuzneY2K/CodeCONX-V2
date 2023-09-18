<template>
  <!-- AD 1 -->
  <Ads />
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
  <MoreAds />
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
// import { logger } from '../utils/Logger.js'
import { postsService } from '../services/postsService.js'
import Pop from '../utils/Pop.js'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState.js'

export default {
  setup() {
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
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
    };
  }
}
</script>

<style scoped>
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