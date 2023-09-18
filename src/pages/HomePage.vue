<template>
  <!-- FORM CONTAINER -->
  <section class="form-container d-flex flex-column align-items-center" v-if="account.id">
    <PostForm />
  </section>
  <!-- SEARCH -->
  <section class="row p-0 m-0 d-flex flex-row justify-content-center">
    <form class="p-0 m-0 px-3" @submit.prevent="getPostsByQuery()">
      <div class="row mt-3">
        <div class="col-md-6 mx-auto">
          <div class="small fw-light">Search posts by query.</div>
          <div class="input-group">
            <input class="form-control elevation-5 rounded" type="search" id="example-search-input" v-model="reqData"
              placeholder="Enter query">
            <span class="input-group-append">
              <button class="btn btn-grad p-0 m-0 px-3 py-2 bg-white rounded elevation-5" type="submit">
                <i class="mdi mdi-magnify"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </form>
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
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState.js'
import { ref } from 'vue'

export default {
  setup() {

    let reqData = ref('cheese')

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
      reqData,
      posts: computed(() => AppState.posts),
      pageNum: computed(() => AppState.pageNum),
      account: computed(() => AppState.account),
      // GET POSTS BY QUERY
      async getPostsByQuery() {
        try {
          logger.log('[GETTING POSTS BY QUERY]')
          logger.log(reqData.value)
          await postsService.getPostsByQuery(reqData.value)
        } catch (error) {
          Pop.error(error)
        }
      }
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