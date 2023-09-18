<template>
  <section class="row p-0 m-0 d-flex flex-column align-items-center">
    <div class="col-md-10 p-0 m-0 px-3">
      <Account v-if="account.id" :account="account" />
    </div>
  </section>
  <section class="row p-0 m-0 d-flex flex-row justify-content-center">
    <EditAccount />
  </section>
</template>
<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {

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
