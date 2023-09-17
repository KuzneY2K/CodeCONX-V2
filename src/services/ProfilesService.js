import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { Profile } from "../models/Profile.js";
import Pop from "../utils/Pop.js";
import { Post } from "../models/Post.js";

class ProfilesService {

    async getProfileById(profileId) {
        try {
            logger.log('[GETTING PROFILE BY ID]')
            AppState.activeProfile = null
            // Clears out the old active profile so that its not there when first loading
            let res = await api.get(`api/profiles/${profileId}`)
            AppState.activeProfile = new Profile(res.data)
        } catch (error) {
            Pop.error(error)
            logger.log('[PROFILE SERVICE]: ERROR', error)
        }
    }


    async getPostsByProfileId(profileId) {
        AppState.posts = []
        AppState.pageNum = 1
        let res = await api.get(`api/profiles/${profileId}/posts`)
        AppState.posts = res.data.posts.map(post => new Post(post))
    }

    async getAccount() {
        let res = await api.get('/account')
        logger.log(res)
    }

    async editAccount(reqData) {
        logger.log(reqData + 'REQ')
        let res = await api.put('/account', reqData)
        logger.log(res)
    }

}

export const profilesService = new ProfilesService()