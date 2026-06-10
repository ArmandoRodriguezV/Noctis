import { GetPrioritiesUc } from "../../application/GetPrioritiesUc.js";
import { CatalogController } from "../http/CatalogController.js";
import { CatalogRepositorySQLite } from "../persistence/CatalogRepositorySQLite.js";

// Repositories
const catalogRepository = new CatalogRepositorySQLite();

// Use cases
const getPrioritiesUc = new GetPrioritiesUc(catalogRepository);

// Controller
const controller = new CatalogController(
    getPrioritiesUc
);

export default controller;