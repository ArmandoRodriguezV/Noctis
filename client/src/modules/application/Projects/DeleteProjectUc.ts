import type { ProjectApiRepository } from "../../infrastructure/http/ProjectApiRepository";

export class DeleteProjectUc {
    constructor(
        private projectRepository: ProjectApiRepository
    ) {}

    async exec(id: number) {
        return await this.projectRepository.deleteProject(id);
    }
}