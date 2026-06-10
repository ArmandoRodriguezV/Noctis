import { randomUUID } from "node:crypto";
import type { SessionRepository } from "../domain/repositories/SessionRepository.js";
import type { UserRepository } from "../domain/repositories/UserRepository.js";
import { hashPassword } from "../../../shared/security/passwords.js";
import { sendEmail } from "../../../shared/mail/mailer.js";

export class RegisterUserUc {
    constructor(
        private userRepository: UserRepository,
        private sessionRepository: SessionRepository
    ) { }

    async exec(username: string, email: string, password: string) {
        const hash = await hashPassword(password);
        const user = await this.userRepository.registerUser(username, email, hash);
        const token = randomUUID();

        await sendEmail(
            email,
            `Te damos la bienvenida a Noctis`,
            `<h1>¡Hola ${username}!</h1>`
        );
        return await this.sessionRepository.createSession(user?.id!, token);
    }
}