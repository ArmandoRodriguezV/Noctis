import type { ProjectRepository } from "../domain/repositories/ProjectRepository.js";

export class FindProjectsUc {
    constructor(
        private repo: ProjectRepository
    ) {}

    async exec(id: number) {
        return await this.repo.findProjects(id);
    }
}