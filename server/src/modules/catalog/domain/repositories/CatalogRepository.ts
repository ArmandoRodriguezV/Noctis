import type { Catalog } from "../entities/Catalog.js";

export interface CatalogRepository {
    getPriorities(): Promise<Catalog[]>;
}