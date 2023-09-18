<template>
    <div v-if="profile">
        <section class="h-100 gradient-custom-2">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100" style="background-image: url();">
                    <div class="col col-lg-9 col-xl-7">
                        <div class="card elevation-5">
                            <div class="rounded-top text-white d-flex flex-row cover-img position-relative"
                                :style="{ backgroundImage: 'url(' + profile.coverImg + ')' }">
                                <div class="ms-4 mt-5 d-flex flex-column">
                                    <img :src="profile.picture" alt="Generic placeholder image"
                                        class="img-fluid img-thumbnail mt-4 mb-2 pfp">

                                </div>
                                <div class="ms-3">
                                    <h5 class="fs-3 pfname position-absolute badge grad-one py-2 px-2">{{ profile.name }}
                                    </h5>
                                    <p class="fs-5 p-0 m-0 position-absolute badge grad-one py-2 px-2 pfclass">Cohort: {{
                                        profile.class
                                    }}</p>
                                </div>
                                <p class="fs-4 bio position-absolute px-5">" {{ bio }} "</p>
                            </div>
                            <div class="card-body p-0 text-black ">
                                <div class="p-0 m-0">
                                    <p class="lead fw-normal p-0 m-0 ms-5 my-3 fs-3">{{ profile.name }}'s Posts</p>
                                </div>
                                <section v-for="post in posts" :key="post.id"
                                    class="row p-0 m-0 justify-content-center position-relative">
                                    <div class=" mb-5">
                                        <Post :post="post" v-if="post" />
                                    </div>
                                </section>
                                <div v-if="posts"
                                    class="col-12 p-0 m-0 d-flex flex-row justify-content-between px-5 mt-4 mb-4">
                                    <button v-if="pageNum <= 1"
                                        class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
                                        @click="pageUpByProfileId()" disabled><i class="mdi mdi-arrow-left"></i>
                                        New
                                        Posts</button>
                                    <button v-if="pageNum >= 2"
                                        class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
                                        @click="pageUpByProfileId()"><i class="mdi mdi-arrow-left"></i>
                                        New
                                        Posts</button>
                                    <button class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
                                        @click="pageDownByProfileId()">Old Posts
                                        <i class="mdi mdi-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js'
import { postsService } from '../services/postsService.js';


export default {
    setup() {
        let route = useRoute()

        async function getProfileById() {
            try {
                await profilesService.getProfileById(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getPostsByProfileId() {
            await profilesService.getPostsByProfileId(route.params.profileId)
        }

        async function pageDownByProfileId() {
            logger.log('[HOME / GETTING OLDER POSTS 🔎]')
            await postsService.pageDownByProfileId(route.params.profileId)
        }

        // PAGE UP - GET RECENT POSTS
        async function pageUpByProfileId() {
            logger.log('[HOME / GETTING RECENT POSTS 🔎]')
            await postsService.pageUpByProfileId(route.params.profileId)
        }


        onMounted(() => {
            getProfileById()
            getPostsByProfileId()
        })

        return {
            pageDownByProfileId,
            pageUpByProfileId,
            getProfileById,
            posts: computed(() => AppState.posts),
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            pageNum: computed(() => AppState.pageNum),
            bio: computed(() => AppState.activeProfile.bio),
        }
    }
}
</script>

<style scoped>
.cover-img {
    height: 22rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.pfname {
    top: 5rem;
}

.pfp {
    height: 8rem !important;
    width: 8rem !important;
}

@media (max-width: 768px) {
    .pfp {
        height: 7rem !important;
        width: 7rem !important;
    }
}

.bio {
    overflow: hidden !important;
    height: 100px;
    bottom: 1rem;
}
</style>