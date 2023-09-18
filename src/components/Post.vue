<template>
    <div class="container p-0 m-0">
        <div class="d-flex justify-content-center row p-0 m-0">
            <div class="p-0 m-0 px-3 card-wrapper">
                <div class="m-0 p-0 bg-white border border-2 rounded elevation-5 mt-2">
                    <div class="card-heading">
                        <div
                            class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom elevation-2 rounded">
                            <div class="d-flex flex-row align-items-center feed-text px-2">
                                <!-- PROFILE PICTURE -->
                                <router-link :to="{ name: 'Profile', params: { profileId: props.post.creatorId } }"
                                    @click.stop>
                                    <img class="rounded-circle pfp" :src="props.post.authorPicture" height="40" width="40">
                                </router-link>
                                <div class="d-flex flex-column flex-wrap ml-2">
                                    <!-- AUTHOR NAME -->
                                    <span class="font-weight-bold ms-2">{{ props.post.authorName }}</span>
                                    <!-- CREATED TIME STAMP -->
                                    <span class="text-black-50 time ms-2">Posted: {{ createdAt.toLocaleDateString([], {
                                        hour: '2-digit', minute: '2-digit'
                                    })
                                    }}</span>
                                </div>
                            </div>
                            <!-- POST DELETE BUTTON -->
                            <button @click="deletePost()" v-if="props.post.creatorId == myAccount.id"
                                class="btn btn-danger p-0 m-0 px-2 py-1 rounded rounded-pill elevation-3"><i
                                    class="mdi mdi-close"></i></button>
                        </div>
                    </div>
                    <!-- POST BODY -->
                    <div class="p-2 px-3 post"><b class="fs-5">{{ props.post.body }}</b></div>
                    <div v-if="props.post.imgUrl" class="media-container mt-3 px-4">
                        <img :src="props.post.imgUrl" alt="" class="media img-fluid rounded elevation-1 mb-3">
                    </div>
                    <!-- LIKES CONTAINER -->
                    <div class="btn-container d-flex justify-content-start">
                        <button class="btn grad-one rounded rounded-pill elevation-3 p-0 m-0 px-2 py-1 mb-3 ms-2"
                            v-if="!myAccount.id" disabled><i class="mdi mdi-heart-outline text-white"></i><span
                                class="text-light ms-2 fs-5">{{
                                    likes.length
                                }}</span></button>
                        <button v-if="myAccount.id"
                            class="grad-one rounded rounded-pill elevation-3 p-0 m-0 px-2 py-1 mb-3 ms-2"
                            @click="likePost()">
                            <i class="mdi mdi-heart-outline text-white animate__animated animate__jackInTheBox"
                                v-if="!props.post.likeIds.includes(myAccount.id)"></i>

                            <i class="mdi mdi-heart text-white animate__animated animate__jackInTheBox"
                                v-if="props.post.likeIds.includes(myAccount.id)"></i>

                            <span class="text-light ms-2 fs-5">{{ likes.length }}</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
// import { logger } from '../utils/Logger.js';
import { postsService } from '../services/postsService.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        post: { type: Post, required: true }
    },
    setup(props) {

        return {
            props,
            myAccount: computed(() => AppState.account),
            likes: computed(() => props.post.likes),
            createdAt: computed(() => new Date(props.post.createdAt)),


            // DELETE POST
            async deletePost() {
                if (await Pop.confirm('Confirm deletion?')) {
                    try {
                        let postId = props.post.id
                        // logger.log('[REMOVING POST ❌]', postId)
                        await postsService.deletePost(postId)
                        await postsService.getPosts()
                        // logger.log('[POST REMOVED]')
                    } catch (error) {
                        Pop.error(error)
                    }
                } else {
                    Pop.error('Deletion cancelled.')
                }
            },

            // LIKE POST
            async likePost() {
                try {
                    let postId = props.post.id
                    await postsService.likePost(postId)
                    // logger.log('[LIKED or UNLIKED]')
                    await postsService.getPostById(postId)
                    postsService.getPostsByPage()
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>

<style scoped>
.media {
    object-fit: cover;
    height: 25rem;
    width: 100%;
}

.post {
    max-height: 12rem;
    overflow-y: scroll;
}

.post::-webkit-scrollbar {
    display: none;
}

.pfp {
    object-fit: cover;
}
</style>