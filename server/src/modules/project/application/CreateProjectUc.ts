import type { ProjectRepository } from "../domain/repositories/ProjectRepository.js";

export class CreateProjectUc {
    constructor(
        private repo: ProjectRepository
    ) {}

    async exec(owner: number, name: string, description: string) {
        await this.repo.createProject(owner, name, description);
    }
}