import { Router } from 'express'
import { authByToken } from '../middleware/auth'
import { createArticle, deleteArticle, deleteFavourite, deleteVote, getAllArticles, getArticleBySlug, getFeedArticles, setFavourite, setVote, updateArticle } from '../controllers/articles'
import { createComment, deleteComment, getComments } from '../controllers/comments';
const route = Router();

// GET /api/articles/test
// get test data
// TODO : 
// STATUS : done
route.get('/test', async (req, res) => {
    try {
        res.status(200).json("rohan");
    } catch (err) {
        return res.status(400).json({
            errors: {
                body: ['could not fetch articles', err.message]
            }
        });
    }
})

// GET /api/articles
// List Articles
// TODO : 
// STATUS : done
route.get('/', async (req, res) => {
    try {
        let { page, size, author } = req.query;
        let username: string = '';
        if(!page) page = '1';
        if(!size) size = '4';
        if(author) username = author as string;
        const limit = parseInt(size as string);
        const offset = (parseInt(page as string) - 1) * parseInt(size as string);
        const [articles, total] = await getAllArticles(limit, offset, username);
        res.status(200).json({ 
            total: total,
            articles: articles
        });
    } catch (err) {
        return res.status(400).json({
            errors: {
                body: ['could not fetch articles', err.message]
            }
        });
    }
})

// GET /api/articles/feed
// feed articles for a given user
// TODO : unable to get email
// STATUS : incomplete
route.get('/feed', authByToken, async (req, res) => {

    try {
        const email = '';
        const feeds = await getFeedArticles(email);
        res.status(200).json({ feeds })
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: ['could not create article', e.message]
            }
        })
    }

})

// GET /api/articles/:slug
// get a single article
// TODO : 
// STATUS : complete
route.get('/:slug', async (req, res) => {
    try {
        const article = await getArticleBySlug(req.params.slug)
        return res.status(200).json({ article })
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: [
                    "Something went wrong",
                    e.message
                ]
            }
        })
    }
})

// POST /api/articles
// create an article
// TODO : 
// STATUS : done
route.post('/', authByToken, async (req, res) => {
    try {
        const article = await createArticle(req.body.article, (req as any).user.email);
        res.status(201).json({ article });
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ['could not create article', err.message]
            }
        })
    }
})

// PATCH /api/articles/:slug
// update an article
// TODO : 
// STATUS : no code
route.patch('/:slug', authByToken, async (req, res) => {
    try {
        const article = await updateArticle(req.params.slug, req.body.article)
        return article
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: ['could not fetch articles', e.message]
            }
        });
    }
})

// DELETE /api/articles
// delete an article
// TODO : done
// STATUS : complete
route.delete('/:slug', authByToken, async (req, res) => {
    try {
        const status = await deleteArticle(req.params.slug);
        res.status(200).json({ status });
    } catch (err) {
        return res.status(400).json({
            errors: {
                body: ['could not fetch articles', err.message]
            }
        });
    }
})


// GET /api/articles/:slug/comments
// get a single article
// TODO : 
// STATUS : complete
route.get('/:slug/comments', async (req, res) => {
    try {
        const comments = await getComments(req.params.slug)
        return res.status(200).json({ comments })
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: [
                    "Something went wrong",
                    e.message
                ]
            }
        })
    }
})

// POST /api/articles/:slug/comments
// create a comment
// TODO : 
// STATUS : done
route.post('/:slug/comments', authByToken, async (req, res) => {
    try {
        const comment = await createComment(req.params.slug, req.body.comment, (req as any).user.email)
        return res.status(200).json({ comment })
    } catch (err) {
        return res.status(422).json({
            errors: {
                body: ['could not create comment', err.message]
            }
        })
    }
})

// DELETE /api/articles/:slug/comments/:id
// delete an article
// TODO : done
// STATUS : complete
route.delete('/:slug/comments/:id', authByToken, async (req, res) => {
    try {
        const status = await deleteComment(req.params.slug, req.params.id)
        return res.status(200).json({ status })
    } catch (err) {
        return res.status(400).json({
            errors: {
                body: ['could not fetch comments', err.message]
            }
        });
    }
})


route.post('/:slug/favorite', authByToken, async (req, res) => {
    try {
        const article = await setFavourite(req.params.slug, (req as any).user.email)
        return res.status(200).json({ article })
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: ['Something went wrong', e.message]
            }
        });
    }
})

route.delete('/:slug/favorite', authByToken, async (req, res) => {
    try {
        const article = await deleteFavourite(req.params.slug, (req as any).user.email)
        return res.status(200).json({ article })
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: ['Something went wrong', e.message]
            }
        });
    }
})

route.post('/:slug/vote', authByToken, async (req, res) => {
    try {
        const article = await setVote(req.params.slug, (req as any).user.email)
        return res.status(200).json({ article })
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: ['Something went wrong', e.message]
            }
        });
    }
})

route.delete('/:slug/vote', authByToken, async (req, res) => {
    try {
        const article = await deleteVote(req.params.slug, (req as any).user.email)
        return res.status(200).json({ article })
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: ['Something went wrong', e.message]
            }
        });
    }
})

export const articlesRoute = route;