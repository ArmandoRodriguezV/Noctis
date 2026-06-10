import type { SessionRepository } from "../domain/repositories/SessionRepository.js";

export class ValidateSessionUc {
    constructor(
        private sessionRepository: SessionRepository
    ) {}

    async exec(token: string) {
        const session = await this.sessionRepository.findByToken(token);
        if (!session) return;
        if (session.active !== 1) return;
        return session;
    }
}