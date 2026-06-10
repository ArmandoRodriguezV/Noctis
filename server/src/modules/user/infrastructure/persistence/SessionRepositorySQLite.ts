import { getDB } from "../../../../configs/db.js";
import type { Session } from "../../domain/entities/Session.js";
import type { SessionRepository } from "../../domain/repositories/SessionRepository.js";

export class SessionRepositorySQLite implements SessionRepository {
    
    async disableSession(id: number): Promise<void> {
        const db = getDB();
        await db.run(
            `UPDATE session SET 
                active = ?,
                closedAt = ?
                WHERE owner = ?
            `,
            [0, Date.now(), id]
        );
    }

    async createSession(owner: number, token: string): Promise<Session> {
        const db = getDB();
        const session = await db.get<Session>(
            `INSERT INTO session (owner, token, createdAt)
            VALUES (?, ?, ?) RETURNING *`,
            [owner, token, Date.now()]
        );
        return session!;
    }
    
    async getUserSessions(id: number): Promise<Session[]> {
        const db = getDB();
        const sessions = await db.all<Session[]>(
            `SELECT * FROM sessions WHERE owner = ?`,
            [id]
        );
        return sessions;
    }

    async findByToken(token: string): Promise<Session> {
        const db = getDB();
        const session = await db.get<Session>(
            `SELECT * FROM session WHERE token = ?`,
            [token]
        );

        return session!;
    }
}