<template>
  <!-- FORM CONTAINER -->
  <section class="form-container d-flex flex-column align-items-center" v-if="account.id">
    <PostForm />
  </section>
  <!-- SEARCH -->
  <section class="row p-0 m-0 d-flex flex-row justify-content-center mt-4">
    <div class="col-6 p-0 m-0 ">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-magnify"></i></span>
        </div>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username"
          aria-describedby="basic-addon1">
      </div>
    </div>
  </section>
  <!--  POST  -->
  <section v-for="post in posts" :key="post.id" class="row p-0 m-0 justify-content-center position-relative">
    <div class="col-12 col-md-6 p-0 m-0 mt-4">
      <Post :post="post" v-if="post" />
    </div>
  </section>
  <!-- PAGNATION BUTTONS -->
  <section class="row p-0 m-0">
    <div v-if="posts" class="col-12 p-0 m-0 d-flex flex-row justify-content-between px-5 mt-4 mb-4">
      <button v-if="pageNum <= 1" class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
        @click="pageUp()" disabled><i class="mdi mdi-arrow-left"></i>
        New
        Posts</button>
      <button v-if="pageNum >= 2" class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
        @click="pageUp()"><i class="mdi mdi-arrow-left"></i>
        New
        Posts</button>
      <button class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5" @click="pageDown()">Old Posts
        <i class="mdi mdi-arrow-right"></i></button>
    </div>
  </section>
</template>

<script>
import { logger } from '../utils/Logger.js'
import { postsService } from '../services/postsService.js'
import Pop from '../utils/Pop.js'
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState.js'
import { ref } from 'vue'

export default {
  setup() {

    // GETTING POSTS
    async function getPosts() {
      try {
        logger.log('[HOME / GETTING POSTS 🔎]')
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }

    // PAGE DOWN - GET OLD POSTS
    async function pageDown() {
      logger.log('[HOME / GETTING OLDER POSTS 🔎]')
      await postsService.pageDown()
    }

    // PAGE UP - GET RECENT POSTS
    async function pageUp() {
      logger.log('[HOME / GETTING RECENT POSTS 🔎]')
      await postsService.pageUp()
    }

    onMounted(() => { getPosts() })
    return {
      pageUp,
      pageDown,
      posts: computed(() => AppState.posts),
      pageNum: computed(() => AppState.pageNum),
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>