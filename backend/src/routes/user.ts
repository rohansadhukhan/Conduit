import { Router } from 'express'
import { getUserByEmail } from '../controllers/users';
import { authByToken } from '../middleware/auth'
const route = Router();

// GET : /user               -> Get user data
route.get('/', authByToken, async (req, res) => {

    try {
        const user = await getUserByEmail((req as any).user.email);
        if (!user) throw new Error('No such user found')
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(404).json({
            error: {
                body: [err.message]
            }
        });
    }

});

// PATCH : /user             -> Update user data
route.patch('/', authByToken, async (req, res) => {

});

export const userRoute = route;