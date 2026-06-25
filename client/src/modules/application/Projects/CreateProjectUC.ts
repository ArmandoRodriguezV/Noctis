import type { ProjectApiRepository } from "../../infrastructure/http/ProjectApiRepository";

export class CreateProjectUc {
    constructor(
        private projectRepository: ProjectApiRepository
    ) {}

    async exec(name: string, description: string) {
        return await this.projectRepository.createProject(name, description);
    }
}