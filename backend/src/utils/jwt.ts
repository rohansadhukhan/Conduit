import jwt from 'jsonwebtoken'
import { User } from '../entities/User';

const JWT_SECRET = "some-very-very-secret-string-that-no-one-knows"

export async function sign(user: User): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign({
            username: user.username,
            email: user.email
        }, JWT_SECRET, (error: any, encoded: string | undefined) => {
            if (error) return reject(error)
            return resolve(encoded as string)
        })
    })
}

export async function decode(token : string): Promise<User> {
    return new Promise<User>((resolve, reject) => { 
        jwt.verify(token, JWT_SECRET, (error, decoded: object | undefined) => {
            if (error) return reject(error)
            return resolve(decoded as User)
        })
    })
}