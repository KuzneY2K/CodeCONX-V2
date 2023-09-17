<template>
    <div class="rounded-top text-white cover-img col-12 d-flex flex-row justify-content-center mt-3 rounded elevation-5 border"
        :style="{ backgroundImage: 'url(' + account.coverImg + ')' }">
        <div class="about text-center">
            <br>
            <h1>{{ props.account.name }}, welcome.</h1>
            <br>
            <img class="rounded mb-3" :src="props.account.picture" alt="" height="200" />
            <p class="bg-white text-black rounded rounded-pill elevation-5">{{ props.account.bio }}</p>
            <p class="bg-white text-black rounded rounded-pill elevation-5">{{ props.account.class }}</p>
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
        }
    }
}
</script>

<style scoped>
.cover-img {
    height: 400px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>