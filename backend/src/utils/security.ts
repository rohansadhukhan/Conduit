import { Article } from '../entities/Article'
import { Comment } from '../entities/Comment'
import { User } from '../entities/User'

export function sanitizeFields(user: User) {
    if (user.password) delete user.password
    return user
}

export function sanitizeArticle(article: Article) {
    if (article.author.password) delete article.author.password
    return article
}

export function sanitizeArticles(articles: Article[]) {
    for (let article of articles) {
        if (article.author.password) delete article.author.password
    }
    return articles
}

export function sanitizeComments(comments: Comment[]) {
    // TODO
    return comments
}

