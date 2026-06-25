import type { ProjectRepository } from "../../domain/repositories/ProjectRepository.js";

export class FindProjectByIdUc {
    constructor(
        private repo: ProjectRepository
    ) {}

    async exec(id: number) {
        return await this.repo.findProjectById(id);
    }
}