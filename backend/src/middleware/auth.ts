import { NextFunction, Response, Request } from "express";
import { decode } from '../utils/jwt'

export async function authByToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.header('Authorization')?.split(' ');
    const cookies = req.headers.cookie?.split(';');
    let token = '';

    // Check if authoriztion header is exists
    if (!authHeader && !cookies) return res.status(401).json({
        error: {
            body: ["Authorization failed", 'No authorization header or cookie']
        }
    })

    if(cookies) {
        token = cookies[0].split('=')[1];
    }

    // Check if authorization type is token
    if (authHeader && authHeader[0] !== "Token" && cookies && cookies[0].split('=')[0] !== "Token") return res.status(401).json({
        error: {
            body: ["Authorization failed", 'Token missing']
        }
    })

    if(authHeader && authHeader[0] === "Token") {
        token = authHeader[1];
    }

    if(cookies) {
        token = cookies[0].split('=')[1];
        console.log('=================================================================================');
        console.log(token);
        console.log('=================================================================================');
    }

    // Check if token is valid
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