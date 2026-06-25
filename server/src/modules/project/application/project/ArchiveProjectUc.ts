import type { ProjectRepository } from "../../domain/repositories/ProjectRepository.js";

export class ArchiverProjectUc {
    constructor(
        private projectRepo: ProjectRepository
    ) {}

    async exec(id: number) {
        const project = await this.projectRepo.findProjectById(id);
        const status = project.isArchiver === 1 ? 0 : 1;
        await this.projectRepo.editProject(id, "isArchiver", status);
        return status === 1 ? `${project.name} ha sido archivado` : `${project.name} ha sido desarchivado`;
    }
}