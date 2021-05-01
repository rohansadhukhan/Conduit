import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { sanitizeComments } from "../utils/security";


export async function getComments(slug: string): Promise<Comment[]> {
    const repo = await getRepository(Comment)
    const articleRepo = await getRepository(Article)
    try {
        const article = await articleRepo.findOne(slug)
        if (!article) throw new Error('Article does not exists')
        const comments = await repo.find({
            relations: ['author', 'article'],
            where: { article }
        })
        // await sanitizeComments(comments)
        return comments
    } catch (e) {
        throw e
    }
}

export async function createComment(slug: string, comment: string, email: string) {
    const repo = await getRepository(Comment)
    const articleRepo = await getRepository(Article)
    const userRepo = await getRepository(User)
    try {
        const article = await articleRepo.findOne(slug)
        const user = await userRepo.findOne(email)
        if (!article) throw new Error('Article not found')
        if (!user) throw new Error('User not found')
        const com = await repo.save(new Comment(
            comment,
            article,
            user
        ))
        return com
    } catch (e) {
        throw e
    }
}

export async function deleteComment(slug: string, id: string): Promise<boolean> {
    const repo = await getRepository(Comment)
    try {
        const comment = await repo.findOne(id)
        if(!comment) throw new Error('Comment not found')
        await repo.delete(id)
        return true
    } catch (e) {
        throw e
    }
}