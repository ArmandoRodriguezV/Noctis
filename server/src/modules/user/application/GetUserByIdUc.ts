import type { UserRepository } from "../domain/repositories/UserRepository.js";

export class GetUserByIdUc {
    constructor(
        private userRepository: UserRepository
    ) {}

    async exec(id: number) {
        return await this.userRepository.getUserById(id);
    }
}