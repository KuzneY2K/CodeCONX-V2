<template>
  <section class="row p-0 m-0 d-flex flex-column align-items-center">
    <div class="col-md-10 p-0 m-0 px-3">
      <Ads />
      <Account class="animate__animated animate__fadeInDown" v-if="account.id" :account="account" />
      <MoreAds />
    </div>
  </section>
  <section class="row p-0 m-0 d-flex flex-row justify-content-center">
    <EditAccount class="animate__animated animate__fadeInUpBig" />
  </section>
</template>
<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {

    async function scrollTop() {
      window.scrollTo(0, 0)
    }

    onMounted(() => { scrollTop() })

    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
