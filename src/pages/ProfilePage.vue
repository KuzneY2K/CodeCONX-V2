<template>
    <div v-if="profile" class="animate__animated animate__fadeIn">
        <Ads />
        <section class="h-100 gradient-custom-2">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100" style="background-image: url();">
                    <div class="col col-lg-9 col-xl-7">
                        <div class="card elevation-5">
                            <div class="rounded-top text-white d-flex flex-row cover-img position-relative animate__animated animate__fadeIn"
                                :style="{ backgroundImage: 'url(' + profile.coverImg + ')' }">
                                <div class="ms-4 mt-5 d-flex flex-column">
                                    <img :src="profile.picture" alt="Generic placeholder image"
                                        class="img-fluid img-thumbnail mt-4 mb-2 pfp">

                                </div>
                                <div class="ms-3">
                                    <h5
                                        class="fs-3 pfname position-absolute badge grad-one py-2 px-2 border elevation-5 animate__animated animate__lightSpeedInLeft">
                                        {{
                                            profile.name }}
                                    </h5>
                                    <p
                                        class="fs-5 p-0 m-0 position-absolute badge grad-one py-2 px-2 pfclass border elevation-5 animate__animated animate__lightSpeedInRight">
                                        {{ profile.class }}</p>
                                    <!-- SOCIAL MEDIA -->
                                    <div class="social-media d-flex flex-row justify-content-start mb-3 position-absolute">
                                        <button class="btn btn-grad p-0 m-0 px-2 border elevation-3 me-3"
                                            @click="gitHub()"><i class="mdi mdi-github"></i></button>
                                        <button class="btn btn-grad p-0 m-0 px-2 border elevation-3 me-3"
                                            @click="linkedIn()"><i class="mdi mdi-linkedin"></i></button>
                                    </div>
                                </div>
                                <p class="bio position-absolute m-0 px-5 rounded elevation-5 animate__fadeIn">" {{ bio
                                }} "</p>
                            </div>
                            <div class="card-body p-0 text-black ">
                                <div class="p-0 m-0">
                                    <p class="lead fw-normal p-0 m-0 ms-5 my-3 fs-3">{{ profile.name }}'s Posts</p>
                                </div>
                                <section v-for="post in posts" :key="post.id"
                                    class="row p-0 m-0 justify-content-center position-relative">
                                    <div class=" mb-5">
                                        <Post class="animate__animated animate__fadeInUp" :post="post" v-if="post" />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="posts" class="col-12 p-0 m-0 d-flex flex-row justify-content-between px-5 mt-4 mb-4">
                <button v-if="pageNum <= 1" class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
                    @click="pageUpByProfileId()" disabled><i class="mdi mdi-arrow-left"></i>
                    New
                    Posts</button>
                <button v-if="pageNum >= 2" class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
                    @click="pageUpByProfileId()"><i class="mdi mdi-arrow-left"></i>
                    New
                    Posts</button>
                <button class="p-0 m-0 btn btn-grad px-4 py-2 border border-1 border-dark elevation-5"
                    @click="pageDownByProfileId()">Old Posts
                    <i class="mdi mdi-arrow-right"></i></button>
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
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

        // PAGE DOWN - GET OLDER POSTS
        async function pageDownByProfileId() {
            // logger.log('[HOME / GETTING OLDER POSTS 🔎]')
            await postsService.pageDownByProfileId(route.params.profileId)
            window.scrollTo(0, 0)
        }

        // PAGE UP - GET RECENT POSTS
        async function pageUpByProfileId() {
            // logger.log('[HOME / GETTING RECENT POSTS 🔎]')
            await postsService.pageUpByProfileId(route.params.profileId)
            window.scrollTo(0, 0)
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
            // SENDS TO GITHUB
            gitHub() {
                location.href = this.profile.github
            },

            // SENDS TO LINKED IN
            linkedIn() {
                location.href = this.profile.linkedin
            }
        }
    }
}
</script>

<style scoped>
.social-media {
    top: 11rem;
}

.cover-img {
    height: 22rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.pfname {
    top: 5rem;
    max-width: 15rem;
    overflow: hidden;
}

.pfclass {
    top: 8rem;
    max-width: 15rem;
    overflow: hidden;
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

    .bio {
        font-size: 1.2rem !important;
    }
}

.bio {
    overflow: scroll !important;
    height: 100px;
    bottom: 1rem;
    background-color: rgba(0, 0, 0, 0.476);
    width: 100%;
    font-size: 1.3rem;
}
</style>