import type { ProjectRepository } from "../domain/repositories/ProjectRepository.js";

export class EditProjectUc {
    constructor(
        private repo: ProjectRepository
    ) {}

    async exec(id: number, field: string, newData: string) {
        await this.repo.editProject(id, field, newData);
    }
}