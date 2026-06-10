import type { UserRepository } from "../../domain/repositories/UserRepository";

export class CreateNewUserUc {
    constructor(
        private userRepository: UserRepository
    ) {}

    async exec(username: string, email: string, password: string) {
        return await this.userRepository.createNewUser(username, email, password);
    }
}