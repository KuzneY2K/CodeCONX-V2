<template>
  <section class="row p-0 m-0 d-flex flex-column align-items-center">
    <div class="col-md-10 p-0 m-0 px-3">
      <Account :account="account" />
    </div>
  </section>
  <section class="row p-0 m-0 d-flex flex-row justify-content-center">
    <div class="col-md-9 col-11 p-0 m-0 mb-5">
      <form class="w-100 bg-white mt-5 p-5 rounded border border-2 elevation-5 " @submit.prevent="editAccount()">
        <h1 class="form-heading mb-3">Edit Account?</h1>
        <!-- NAME -->
        <div class="mb-3">
          <label for="nameInput" class="form-label">Change display name?</label>
          <input type="text" v-model="reqBody.name" class="form-control p-1" id="nameInput"
            aria-describedby="nameInputHelp">
          <div id="nameInputHelp" class="form-text">We only support URLs for GIFs and Images.</div>
        </div>
        <!-- PFP -->
        <div class="mb-3">
          <label for="imgUrl" class="form-label">Insert URL for profile picture.</label>
          <input type="url" v-model="reqBody.picture" class="form-control p-1" id="imgUrl" aria-describedby="imgUrlHelp">
          <div id="imgUrlHelp" class="form-text">We only support URLs for GIFs and Images.</div>
        </div>
        <!-- COVER IMG -->
        <div class="mb-3">
          <label for="coverImgUrl" class="form-label">Insert URL for cover img.</label>
          <input type="url" v-model="reqBody.coverImg" class="form-control p-1" id="coverImgUrl"
            aria-describedby="imgUrlHelp">
          <div id="coverImgUrlHelp" class="form-text">We only support URLs for GIFs and Images.</div>
        </div>
        <!-- BIO -->
        <div class="mb-3">
          <label for="bioInput" class="form-label">Insert new bio.</label>
          <input type="text" v-model="reqBody.bio" class="form-control p-1" id="bioInput" aria-describedby="bioInputHelp">
        </div>
        <!-- Update Cohort -->
        <div class="mb-3">
          <label for="classInput" class="form-label">Insert your cohort.</label>
          <input type="text" v-model="reqBody.class" class="form-control p-1" id="classInput"
            aria-describedby="classInputHelp">
        </div>
        <!-- GITHUB LINK -->
        <div class="mb-3">
          <label for="gitHubUrl" class="form-label">Insert your GitHub URL.</label>
          <input type="url" v-model="reqBody.github" class="form-control p-1" id="gitHubUrl"
            aria-describedby="gitHubUrlHelp">
        </div>
        <!-- LINKEDIN LINK -->
        <div class="mb-3">
          <label for="linkedinUrl" class="form-label">Insert your LinkedIn URL.</label>
          <input type="url" v-model="reqBody.linkedin" class="form-control p-1" id="linkedinUrl"
            aria-describedby="linkedinUrlHelp">
        </div>
        <!-- SUBMIT -->
        <button type="submit" class="btn btn-grad px-4 py-2 border border-1 border-dark elevation-5">Submit</button>
      </form>
    </div>
  </section>
</template>
<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import { onMounted, ref } from 'vue';
import { Account } from '../models/Account.js';
import { router } from '../router.js';
import { useRouter } from 'vue-router';
export default {
  setup() {

    let router = useRouter()
    let reqBody = ref({})
    return {


      reqBody,

      account: computed(() => AppState.account),

      async editAccount() {
        await profilesService.editAccount(reqBody.value)
        router.push({ name: 'Profile', params: { profileId: this.account.id } })
      }

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
