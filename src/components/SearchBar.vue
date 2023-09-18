<template>
    <div class="col-12 p-0 m-0">
        <form class="p-0 m-0 px-3" @submit.prevent="getPostsByQuery()">
            <div class="row mt-3">
                <div class="col-md-6 mx-auto">
                    <div class="small fw-light">Search posts by query.</div>
                    <div class="input-group">
                        <input class="form-control elevation-5 rounded" type="search" id="example-search-input"
                            v-model="reqData" placeholder="Enter query">
                        <span class="input-group-append">
                            <button class="btn btn-grad p-0 m-0 px-3 py-2 bg-white rounded elevation-5" type="submit">
                                <i class="mdi mdi-magnify"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/postsService.js';

export default {
    setup() {
        let reqData = ref('cheese')
        return {
            reqData,
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

<style scoped></style>