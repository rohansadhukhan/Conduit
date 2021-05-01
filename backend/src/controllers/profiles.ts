import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { sanitizeFields } from "../utils/security";


export async function getUser(username: string): Promise<User> {

    try {

        const repo = await getRepository(User)
        const user = await repo.findOne({
            username: username
        })
        if (!user) throw new Error(`No user exists with the username ${username}`)
        return sanitizeFields(user)

    } catch (e) {
        throw e
    }

}

export async function followUser(username: string, email: string) {
    
}

export async function unFollowUser(username: string, email: string) {
    
}

