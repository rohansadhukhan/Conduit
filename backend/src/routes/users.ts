import { Router } from 'express'
import { createUser, loginUser } from '../controllers/users';
const route = Router();

// POST : /users/login         -> Login user
route.post('/login', async (req, res) => {
    try {
        const user = await loginUser({
            email: req.body.user.email,
            password: req.body.user.password
        })
        return res.json({ user })
    } catch (err) {
        console.error(err)
        return res.status(422).json({
            errors: {
                body: ['login failed', err.message]
            }
        })
    }
})

// POST : /users               -> Register new user
route.post('/', async (req, res) => {
    try {
        const user = await createUser({
            username: req.body.user.username,
            email: req.body.user.email,
            password: req.body.user.password
        })
        return res.json({ user })
    } catch (err) {
        console.error(err)
        return res.status(422).json({
            errors: {
                body: ['could not create user', err.message]
            }
        })
    }
})

export const usersRoute = route;