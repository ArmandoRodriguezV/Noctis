import type { Session } from "../entities/Session.js";

export interface SessionRepository {
    createSession(owner: number, token: string): Promise<Session>;
    getUserSessions(id: number): Promise<Session[]>;
    findByToken(token: string): Promise<Session>;
    disableSession(id: number): Promise<void>;
}