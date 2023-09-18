import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

class PostsService {
    // GET POSTS
    async getPosts() {
        try {
            // logger.log('[Service GET Request Fired]')
            let res = await api.get('/api/posts')
            // logger.log(res.data)
            AppState.posts = res.data.posts.map(post => new Post(post))
            // logger.log(AppState.posts)
        } catch (error) {
            Pop.error('[SERVICE GET ERROR]')
            logger.log(error)
        }
    }

    // GET BY PAGE NUM
    async getPostsByPage() {
        try {
            let res = await api.get(`/api/posts?page=${AppState.pageNum}`)
            AppState.posts = res.data.posts.map(post => new Post(post))
            // logger.log(AppState.posts)
        } catch (error) {
            Pop.error(error)
        }
    }

    // PAGE DOWN - GET OLD POSTS
    async pageDown() {
        try {
            AppState.pageNum += 1
            // logger.log(`Page ${AppState.pageNum}`)
            let res = await api.get(`/api/posts?page=${AppState.pageNum}`)
            AppState.posts = res.data.posts.map(post => new Post(post))
            // logger.log(AppState.posts)
        } catch (error) {
            Pop.error('[SERVICE GET PAGE DOWM ERROR]')
            logger.log(error)
        }
    }

    // PAGE UP - GET RECENT POSTS
    async pageUp() {
        try {
            AppState.pageNum = AppState.pageNum <= 0 ? AppState.pageNum = 0 : AppState.pageNum -= 1
            // logger.log(`Page ${AppState.pageNum}`)
            let res = await api.get(`/api/posts?page=${AppState.pageNum}`)
            AppState.posts = res.data.posts.map(post => new Post(post))
            // logger.log(AppState.posts)
        } catch (error) {
            Pop.error('[SERVICE GET PAGE UP ERROR]')
            logger.log(error)
        }
    }

    // PAGE DOWN - GET OLD POSTS
    async pageDownByProfileId(profileId) {
        try {
            AppState.pageNum += 1
            // logger.log(`Page ${AppState.pageNum}`)
            let res = await api.get(`/api/profiles/${profileId}/posts?page=${AppState.pageNum}`)
            AppState.posts = res.data.posts.map(post => new Post(post))
            // logger.log(AppState.posts)
        } catch (error) {
            Pop.error('[ERROR]: Are you sure this user has made enough posts?')
            logger.log(error)
        }
    }

    // PAGE UP - GET RECENT POSTS
    async pageUpByProfileId(profileId) {
        try {
            AppState.pageNum = AppState.pageNum <= 0 ? AppState.pageNum = 0 : AppState.pageNum -= 1
            // logger.log(`Page ${AppState.pageNum}`)
            let res = await api.get(`/api/profiles/${profileId}/posts?page=${AppState.pageNum}`)
            AppState.posts = res.data.posts.map(post => new Post(post))
            // logger.log(AppState.posts)
        } catch (error) {
            Pop.error('[SERVICE GET PAGE UP ERROR]')
            logger.log(error)
        }
    }

    // GET ADS
    async getAds() {
        let res = await api.get('/api/ads')
        AppState.adOne = res.data[0].banner
        AppState.adTwo = res.data[1].banner
    }

    // GET POSTS BY QUERY
    async getPostsByQuery(query) {
        AppState.posts = []
        let res = await api.get(`/api/posts?query=${query}`)
        // logger.log(`RES ${res.data.posts}`)
        AppState.posts = res.data.posts.map(post => new Post(post))
        Pop.success(`Showing post result for search: ${query}`)
    }

    // CREATE POST
    async createPost(data) {
        let res = await api.post('/api/posts', data)
        // logger.log(res.data)
        let newPost = new Post(res.data)
        AppState.posts.push(newPost)
    }

    // DELETE POST
    async deletePost(postId) {
        let res = await api.delete(`/api/posts/${postId}`)
        // logger.log(res)
        let reloadedList = AppState.posts.filter(post => post.id != postId)
        AppState.posts = reloadedList
    }

    // LIKE POST
    async likePost(postId) {
        let res = await api.post(`/api/posts/${postId}/like`)
        // logger.log(res.data)
    }

    // GET BY ID
    async getPostById(postId) {
        let res = await api.get(`/api/posts/${postId}`)
        // logger.log(res)
    }
}

export const postsService = new PostsService()