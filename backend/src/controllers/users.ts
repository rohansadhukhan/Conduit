import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { hashPassword, matchPassword } from "../utils/password"
import { sanitizeFields } from '../utils/security'
import { sign } from '../utils/jwt'

interface UserSignupData {
    username: string
    password: string
    email: string
}

interface UserLoginData {
    email: string
    password: string
}

interface UserUpdateData {
    username?: string
    password?: string
    bio?: string
    image?: string
}

export async function createUser(data: UserSignupData) {

    //Check for data validity
    if (!data.username) throw new Error("Username must be provided")
    if (!data.email) throw new Error("Email must be provided")
    if (!data.password) throw new Error("Password must be provided")

    //Check if user data exist
    const repo = await getRepository(User)
    const existing = await repo.findOne(data.email)
    if (existing) throw new Error("User with this email already exists")

    //Create user and send back
    try {
        const user = await repo.save(new User(
            data.username,
            data.email,
            await hashPassword(data.password)
        ))

        user.token = await sign(user)
        return sanitizeFields(user)
    } catch (e) {
        console.error(e)
    }

}

export async function loginUser(data: UserLoginData): Promise<User> {

    //Check for data validity
    if (!data.email) throw new Error("Email must be provided")
    if (!data.password) throw new Error("Password must be provided")

    const repo = await getRepository(User)

    // Check if email exists
    const user = await repo.findOne(data.email)
    if (!user) throw new Error("Email is not exists")

    // Check if password match
    const match = await matchPassword(user.password!, data.password)

    if (match === false) throw new Error("Wrong password")

    user.token = await sign(user)
    return sanitizeFields(user)

}

export async function getUserByEmail(email: string): Promise<User> {
    
    const repo = await getRepository(User)

    const user = await repo.findOne(email)
    if (!user) throw new Error("Email is not exists")

    return sanitizeFields(user)
}

export async function updateUserDetails(data: UserUpdateData, email: string): Promise<User> {

    const repo = await getRepository(User);
    const user = await repo.findOne(email);

    if(!user) throw new Error("No user with this email id");

    if(data.bio) user.bio = data.bio;
    else if(data.username) user.username = data.username;
    else if(data.image) user.image = data.image;
    else if(data.password) user.password = await hashPassword(data.password);
    
    const updatedUser = await repo.save(user);

    return sanitizeFields(updatedUser);
    
}