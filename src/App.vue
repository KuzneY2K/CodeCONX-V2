<template>
  <header class="sticky-top">
    <Navbar class="animate__animated animate__fadeInDownBig" />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="grad-one text-center p-0 m-0 py-4 elevation-5">
    <div class="text-center p-0 m-0 text-light">
      © KuzneY2K / CodeWorks / CodeCONX 23
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
