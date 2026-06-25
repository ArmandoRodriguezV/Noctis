import type { ProjectRepository } from "../../domain/repositories/ProjectRepository.js";

export class EditProjectUc {
    constructor(
        private repo: ProjectRepository
    ) {}

    async exec(id: number, field: string, newData: any) {
        await this.repo.editProject(id, field, newData);
    }
}