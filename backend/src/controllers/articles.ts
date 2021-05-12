import { getRepository } from 'typeorm'
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { slugify } from '../utils/stringUtils';
import { sanitizeArticle, sanitizeArticles, sanitizeFields } from '../utils/security'
import { Tag } from '../entities/Tag';
import { articlesRoute } from '../routes/articles';

interface ArticleData {
    title: string
    description: string
    tags: Array<string>
}

// TODO : 
// STATUS : done
export async function createArticle(data: ArticleData, email: string): Promise<Article> {
    //Check for data validity
    if (!data.title) throw new Error("Article title must be provided")
    if (!data.description) throw new Error("Article description must be provided")

    const articleRepo = getRepository(Article);
    const userRepo = getRepository(User);
    const tagsRepo = getRepository(Tag);

    try {
        const user = await userRepo.findOne(email);
        if (!user) throw new Error("User is not exists");

        const fav = new Array<User>();
        console.log(fav);

        const tagList: Tag[] = [];

        data.tags.forEach(async tag => {
            const exist = await tagsRepo.findOne({
                where: {
                    name: tag
                }
            });
            if(exist) tagList.push(exist);
            else {
                const newTag = await tagsRepo.save(new Tag(tag));
                tagList.push(newTag);
            }
        });

        const newArticle = new Article(
            slugify(data.title),
            data.title,
            data.description,
            false,
            0,
            tagList,
            sanitizeFields(user),
            fav
        )
        const article = await articleRepo.save(newArticle);
        console.log(newArticle);
        return article;
    } catch (e) {
        console.error(e)
        throw new Error(e.message)
    }
}

// TODO : checking needed
// STATUS : done
export async function deleteArticle(slug: string): Promise<boolean> {

    const repo = getRepository(Article);
    try {
        const article = await repo.findOne({ slug: slug })
        if (!article) throw new Error('Article does not exists')
        const done = await repo.delete(slug);
        console.log(done)
        if (!done) return false
        return true;
    } catch (e) {
        console.error(e.message)
        throw new Error(e.message)
    }
    return true
}

// TODO : 
// STATUS : incomplete
export async function updateArticle(slug: string, data: Partial<ArticleData>): Promise<Article> {
    const repo = getRepository(Article)
    try {
        const article = await repo.findOne(slug, { relations: ['author', 'tags'] })
        if (!article) throw new Error('Article does not exists')

        if (data.title) article.title = data.title
        if (data.description) article.description = data.description

        await repo.update(slug, article)
        return article
    } catch (e) {
        throw e
    }
}

// TODO : 
// STATUS : complete
export async function getAllArticles(limit: number, offset: number): Promise<[Article[], number]> {

    const repo = getRepository(Article);

    try {
        const articles = await repo.findAndCount({ 
            skip: offset,
            take: limit,
            relations: ['author'] 
        });
        let [article, total] = articles;
        sanitizeArticles(article)
        return articles;
    } catch (err) {
        throw new Error(err.message)
    }

}

// TODO : checking needed
// STATUS : done
export async function getFeedArticles(email: string): Promise<Article[]> {
    const repo = getRepository(Article);

    try {
        const articles = await repo.find({
            where: { email }
        });
        return articles;
    } catch (err) {
        throw new Error(err.message)
    }
}

// TODO : Done
// STATUS : complete
export async function getArticleBySlug(slug: string): Promise<Article> {
    const repo = getRepository(Article)

    try {
        const article = await repo.findOne({
            relations: ['author'],
            where: { slug: slug }
        })
        if (!article) throw new Error('Article does not exists')
        return sanitizeArticle(article)
    } catch (e) {
        throw new Error(e.message)
    }

}

export async function setFavourite(slug: string, email: string) {
    const articleRepo = getRepository(Article)
    const userRepo = getRepository(User)
    try {
        const article = await articleRepo.findOne(slug, {
            relations: ['favouriteUsers']
        });
        const user = await userRepo.findOne(email);
        if (!article) throw new Error('Article does not exists');
        if (!user) throw new Error('User does not exists');

        console.log(article.favouriteUsers);
        console.log(article);

        article.favouriteUsers.forEach(user => {
            if (user.email === email) {
                throw new Error('article is already favourited by the user')
            }
        });

        if (article.favouriteUsers) {
            const fusers = article.favouriteUsers
            article.favouriteUsers = [user, ...fusers];
        } else {
            article.favouriteUsers = [user];
        }

        article.favouriteCount += 1;
        await articleRepo.save(article);
        return article;

    } catch (e) {
        throw e
    }
}

export async function deleteFavourite(slug: string, email: string) {
    const articleRepo = getRepository(Article)
    const userRepo = getRepository(User)
    try {
        const article = await articleRepo.findOne(slug, {
            relations: ['favouriteUsers']
        });
        const user = await userRepo.findOne(email);
        if (!article) throw new Error('Article does not exists');
        if (!user) throw new Error('User does not exists');

        console.log(article.favouriteUsers);
        console.log(article);

        const fusers = new Array<User>()

        article.favouriteUsers.forEach(user => {
            if (user.email !== email) {
                fusers.push(user)
            }
        });

        if (article.favouriteUsers === fusers)
            throw new Error('article is not favourited by the user')

        article.favouriteUsers = fusers
        article.favouriteCount -= 1
        await articleRepo.save(article)
        return article

    } catch (e) {
        throw e
    }
}

export async function setVote(slug: string, email: string) {
    const articleRepo = await getRepository(Article)
    const userRepo = await getRepository(User)
    try {
        const user = await userRepo.findOne(email)
        if (!user) throw new Error('User does not exists')
        const article = await articleRepo.findOne(slug, { relations: ['votedUser'] })
        if (!article) throw new Error('Article does not exists')

        article.votedUser.push(user)
        await articleRepo.save(article)
        return article

    } catch (e) {
        throw e
    }
}

export async function deleteVote(slug: string, email: string) {
    const articleRepo = await getRepository(Article)
    const userRepo = await getRepository(User)
    try {
        const user = await userRepo.findOne(email, { relations: ['votedArticle'] })
        if (!user) throw new Error('User does not exists')
        const article = await articleRepo.findOne(slug, { relations: ['votedUser'] })
        if (!article) throw new Error('Article does not exists')

        const vusers: Array<User> = new Array<User>()
        article.votedUser.forEach(u => {
            if (u.email != user.email) vusers.push(u)
        });
        const varticles: Array<Article> = new Array<Article>()
        user.votedArticle.forEach(a => {
            if (a.slug != article.slug) varticles.push(a)
        });
        user.votedArticle = varticles
        await articleRepo.save(article)
        await userRepo.save(user)
        return article

    } catch (e) {
        throw e
    }
}