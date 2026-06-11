import type { UserRepository } from "../../domain/repositories/UserRepository";

export class LoginUserUc {
    constructor(
        private userRepository: UserRepository
    ) {}

    async exec(email: string, password: string) {
        return await this.userRepository.loginUser(email, password);
    }
}