<template>
  <nav class="navbar navbar-expand-lg navbar-dark grad-one p-0 m-0 py-md-5 py-4 elevation-5">
    <router-link class="navbar-brand d-flex p-0 m-0" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center p-0 m-0">
        <h1 class="nav-title p-0 m-0 ms-3 ms-md-4"><i class="mdi mdi-xml"></i> CodeCONX</h1>
      </div>
    </router-link>
    <button class="navbar-toggler p-0 m-0 px-2 py-1 me-4" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li class="ms-5">
          <router-link :to="{ name: 'Account' }"
            class="btn selectable text-light text-uppercase my-2 me-3 btn-grad p-0 px-4 py-2 border" v-if="account.id">
            My Account
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import Login from './Login.vue';
import { AppState } from '../AppState.js';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
