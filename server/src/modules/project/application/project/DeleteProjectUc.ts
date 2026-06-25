import type { ProjectRepository } from "../../domain/repositories/ProjectRepository.js";

export class DeleteProjectUc {
    constructor(
        private repo: ProjectRepository
    ) {}

    async exec(id: number) {
        await this.repo.deleteProject(id);
    }
}