<template>
  <span class="navbar-text">
    <button class="btn selectable text-light text-uppercase my-2 me-3 btn-grad p-0 px-4 py-2 border" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0 me-md-4 me-4 d-flex flex-row justify-content-start ms-3">
        <div type="button" class="border-0 selectable no-select rounded rounded-pill" data-bs-toggle="dropdown"
          aria-expanded="false">
          <div v-if="account.picture || user.picture" class="d-flex flex-column align-items-center">
            <img :src="account.picture || user.picture" alt="account photo" height="60"
              class="rounded rounded-pill elevation-5 border" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
