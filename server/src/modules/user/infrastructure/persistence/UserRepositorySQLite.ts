import type { User } from "../../domain/entities/User.js";
import type { UserRepository } from "../../domain/repositories/UserRepository.js";
import { getDB } from "../../../../configs/db.js";

export class UserRepositorySQLite implements UserRepository {
    async registerUser(username: string, email: string, password: string): Promise<User> {
        try {
            const db = getDB();
            const user = await db.get<User>(
                `INSERT INTO user (username, email, password) VALUES (?, ?, ?) RETURNING *`,
                [username, email, password]
            );
            if (!user) throw new Error("No se pudo crear el usuario");
            return user;
        } catch (err: any) {
            if (err.code === "SQLITE_CONSTRAINT") {
                throw new Error("El correo ya existe");
            }

            throw err;
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        const db = getDB();
        const user = await db.get<User>(
            `SELECT * FROM user WHERE email = ?`,
            [email]
        );
        return user!;
    }

    async getUserById(id: number): Promise<User> {
        const db = getDB();
        const user = await db.get<User>(
            `SELECT * FROM user WHERE id = ?`,
            [id]
        );
        return user!;
    };
}