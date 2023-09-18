<template>
    <section class="row adContainer d-flex flex-column align-items-center p-0 m-0 animate__animated animate__fadeInDown">
        <div class="col-6 d-flex flex-column align-items-center">
            <img :src="adOne" alt="" height="165" class="mt-4 rounded border elevation-5 ads">
        </div>
    </section>
</template>

<script>
import { postsService } from '../services/postsService.js'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState.js'
export default {
    setup() {
        async function getAds() {
            // logger.log('GETTING ADS');
            await postsService.getAds();
        }

        onMounted(() => { getAds(); });
        return {
            getAds,
            adOne: computed(() => AppState.adOne),
        }
    }
}
</script>

<style scoped>
@media (max-width: 768px) {
    .ads {
        height: 85px;
    }
}
</style>