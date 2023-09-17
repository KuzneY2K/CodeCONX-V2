export class Post {
    constructor(data) {
        this.id = data.id
        this.createdAt = data.createdAt
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.likes = data.likes
        this.updatedAt = data.updatedAt
        this.authorName = data.creator.name
        this.authorPicture = data.creator.picture
        this.authorClass = data.creator.class
        this.liked = null
    }
}