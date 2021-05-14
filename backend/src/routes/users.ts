import { Router } from 'express'
import cors from 'cors';
import { createUser, loginUser } from '../controllers/users';
import cookieParser from 'cookie-parser';

const corsOption = {
    origin: ['http:localhost:3000', 'http:localhost:3232'],
    credentials: true,
    exposedHeaders: ['set-cookie']
}

const route = Router();
// route.use(cookieParser());
// route.use(cors(corsOption));

// POST : /users/login         -> Login user
route.post('/login', async (req, res) => {
    try {
        const user = await loginUser({
            email: req.body.user.email,
            password: req.body.user.password
        })
        res.cookie("Token", user.token);
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