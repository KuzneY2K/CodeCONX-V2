<template>
    <div v-if="posts" class="col-12 p-0 m-0 d-flex flex-row justify-content-between px-5 mt-4 mb-4">
        <!-- DISABLE IF ON PAGE ONE / GET RECENT POSTS -->
        <button v-if="pageNum <= 1" class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
            @click="pageUp()" disabled><i class="mdi mdi-arrow-left"></i>
            New
            Posts</button>
        <!-- GET RECENT POSTS -->
        <button v-if="pageNum >= 2" class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
            @click="pageUp()"><i class="mdi mdi-arrow-left"></i>
            New
            Posts</button>
        <!-- GET OLDER POSTS -->
        <button class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5" @click="pageDown()">Old Posts
            <i class="mdi mdi-arrow-right"></i></button>
    </div>
</template>

<script>
import { logger } from '../utils/Logger.js'
import { postsService } from '../services/postsService.js'
import Pop from '../utils/Pop.js'
import { computed } from 'vue'
import { AppState } from '../AppState.js'
export default {
    setup() {
        // PAGE DOWN - GET OLD POSTS
        async function pageDown() {
            // logger.log('[HOME / GETTING OLDER POSTS 🔎]')
            await postsService.pageDown()
            window.scrollTo(0, 0)
        }

        // PAGE UP - GET RECENT POSTS
        async function pageUp() {
            // logger.log('[HOME / GETTING RECENT POSTS 🔎]')
            await postsService.pageUp()
            window.scrollTo(0, 0)
        }
        return {
            pageUp,
            pageDown,
            posts: computed(() => AppState.posts),
            pageNum: computed(() => AppState.pageNum),
        }
    }
}
</script>

<style scoped></style>