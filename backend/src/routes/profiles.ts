import { Router } from 'express'
import { followUser, getUser } from '../controllers/profiles'
import { authByToken } from '../middleware/auth'

const route = Router()

// GET /api/profiles/:username
// get user by username
// TODO : 
// STATUS : no code
route.get('/:username', async (req, res) => {
    try {
        const user = await getUser(req.params.username)
        return res.status(200).json({ user })
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: [e.message]
            }
        })
    }
})

// POST /api/profiles/:username/follow
// follow user by username
// TODO : 
// STATUS : no code
route.post('/:username/follow', authByToken, async (req, res) => {
    try {
        const user = await followUser(req.params.username, (req as any).user.email)
        return res.status(200).json({ user })
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: [e.message]
            }
        })
    }
})

// DELETE /api/profiles/:username/following
// unfollow user by username
// TODO : 
// STATUS : no code
route.delete('/:username/follow', async (req, res) => {

})

export const profileRouter = route