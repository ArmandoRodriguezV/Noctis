import { randomUUID } from "node:crypto";
import { comparePassword } from "../../../shared/security/passwords.js";
import type { SessionRepository } from "../domain/repositories/SessionRepository.js";
import type { UserRepository } from "../domain/repositories/UserRepository.js";

export class LoginUserUc {
    constructor(
        private sessionRepository: SessionRepository,
        private userRepository: UserRepository
    ) {}

    async exec(email: string, password: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) return;
        const compare = await comparePassword(password, user.password!);
        if (!compare) return;
        const token = randomUUID();
        const session = await this.sessionRepository.createSession(user.id!, token);
        return session;
    }
}