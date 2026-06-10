import type { CatalogRepository } from "../domain/repositories/CatalogRepository.js";

export class GetPrioritiesUc {
    constructor(
        private repo: CatalogRepository
    ) {}

    async exec() {
        return await this.repo.getPriorities();
    }
}