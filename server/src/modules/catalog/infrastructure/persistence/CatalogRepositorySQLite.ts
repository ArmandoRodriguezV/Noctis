import { getDB } from "../../../../configs/db.js";
import type { Catalog } from "../../domain/entities/Catalog.js";
import type { CatalogRepository } from "../../domain/repositories/CatalogRepository.js";

export class CatalogRepositorySQLite implements CatalogRepository {
    async getPriorities(): Promise<Catalog[]> {
        const db = getDB();
        const catalogs = await db.all(
            `SELECT * FROM catalog WHERE type = ?`,
            "PRIORITY"
        );
        return catalogs;
    }
}