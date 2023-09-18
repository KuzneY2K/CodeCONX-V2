<template>
    <div class="col-md-6 col-12 px-3">
        <!-- FORM -->
        <form class="w-100 bg-white mt-4 p-5 rounded border border-2 elevation-5" @submit.prevent="createPost()">
            <h1 class="form-heading mb-3">Create A CONX Post?</h1>
            <!-- MEDIA URL INPUT -->
            <div class="mb-3">
                <label for="imageUrl" class="form-label">Insert URL for media.</label>
                <input type="url" v-model="reqBody.imgUrl" class="form-control p-1" id="imageUrl"
                    aria-describedby="imgUrlHelp">
                <div id="imgUrlHelp" class="form-text">We only support URLs for GIFs and Images.</div>
            </div>
            <!-- MESSAGE INPUT -->
            <div class="mb-3">
                <label for="body" class="form-label">What's on your mind?</label>
                <input type="text" v-model="reqBody.body" class="form-control p-3" id="body" required minlength="1"
                    maxlength="250">
            </div>
            <!-- SUBMIT FORM -->
            <button type="submit" class="btn btn-grad px-4 py-2 border border-1 border-dark elevation-5">Submit</button>
        </form>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { postsService } from '../services/postsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {
    setup() {
        // FORM DATA
        let reqBody = ref({})
        return {
            reqBody,
            account: computed(() => AppState.account),
            // CREATE POST FUNCTION
            async createPost() {
                try {
                    logger.log('[CREATING POST]')
                    await postsService.createPost(reqBody.value)
                    reqBody.value = {}
                    await postsService.getPosts()
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>

<style scoped></style>