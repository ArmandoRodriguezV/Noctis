import type { User } from "../entities/User.js";

export interface UserRepository {
    registerUser(username: string, email: string, password: string): Promise<User>;
    getUserById(id: number): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
}