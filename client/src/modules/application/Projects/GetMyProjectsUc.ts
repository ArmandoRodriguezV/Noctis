import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class GetMyProjectsUc {
    constructor(
        private projectRepository: ProjectRepository
    ) {}

    async exec() {
        return await this.projectRepository.getProjects();
    }
}