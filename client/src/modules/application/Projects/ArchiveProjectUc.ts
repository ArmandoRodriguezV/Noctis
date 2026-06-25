import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class ArchiveProjectUc {
    constructor(
        private projectRepo: ProjectRepository
    ) {}

    async exec(id: number) {
        return await this.projectRepo.archiveProject(id);
    }
}