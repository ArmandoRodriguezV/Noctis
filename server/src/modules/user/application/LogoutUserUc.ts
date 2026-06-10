import type { SessionRepository } from "../domain/repositories/SessionRepository.js";

export class LogoutUserUc {
    constructor(
        private sessionRepository: SessionRepository
    ) {}

    async exec(id: number) {
        await this.sessionRepository.disableSession(id);
    }
}