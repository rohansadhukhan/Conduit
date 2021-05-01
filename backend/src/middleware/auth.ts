import { NextFunction, Response, Request } from "express";
import { decode } from '../utils/jwt'

export async function authByToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.header('Authorization')?.split(' ');

    // Check if authoriztion header is exists
    if (!authHeader) return res.status(401).json({
        error: {
            body: ["Authorization failed", 'No authorization header']
        }
    })

    // Check if authorization type is token
    if (authHeader[0] !== "Token") return res.status(401).json({
        error: {
            body: ["Authorization failed", 'Token missing']
        }
    })

    // Check if token is valid
    const token = authHeader[1];
    try {
        const user = await decode(token);
        if (!user) throw new Error('No user found in token');
        (req as any).user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            body: ["Authorization failed", err.message]
        })
    }

}