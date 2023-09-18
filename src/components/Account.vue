<template>
    <div class="rounded-top text-white cover-img col-12 d-flex flex-row justify-content-center mt-3 rounded elevation-5 border"
        :style="{ backgroundImage: 'url(' + account.coverImg + ')' }">
        <div class="about text-center">
            <br>
            <h1 class="mt-3">{{ props.account.name }}, welcome.</h1>
            <br>
            <img class="rounded mb-3 border border-4 elevation-5" :src="props.account.picture" alt="" height="200" />
            <div class="account-stuff d-flex flex-column align-items-center">
                <div class="social-media d-flex flex-row justify-content-around mb-3">
                    <button class="btn btn-light me-2 border border-dark" @click="gitHub()"><i
                            class="mdi mdi-github"></i></button>
                    <button class="btn btn-light ms-2 border border-dark" @click="linkedIn()"><i
                            class="mdi mdi-linkedin"></i></button>
                </div>
                <p class="bg-white text-black rounded elevation-5 w-75 border border-dark">{{ props.account.bio }}</p>
                <p class="bg-white text-black rounded elevation-5 w-75 border border-dark">{{ props.account.class }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { Account } from '../models/Account.js';
import { logger } from '../utils/Logger.js';
import { profilesService } from '../services/ProfilesService.js';

export default {
    props: { account: { type: Account, required: true } },
    setup(props) {

        async function getAccount() {
            logger.log('ACCOUNT')
            await profilesService.getAccount()
        }

        onMounted(() => {
            getAccount()
        })

        return {
            props,

            // SENDS TO GITHUB
            gitHub() {
                location.href = props.account.github
            },

            // SENDS TO LINKED IN
            linkedIn() {
                location.href = props.account.linkedin
            }
        }
    }
}
</script>

<style scoped>
.cover-img {
    height: 500px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>