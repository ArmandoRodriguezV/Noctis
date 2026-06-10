import { CreateProjectUc } from "../../application/CreateProjectUc.js";
import { DeleteProjectUc } from "../../application/DeleteProjectUc.js";
import { EditProjectUc } from "../../application/EditProjectUc.js";
import { FindProjectByIdUc } from "../../application/FindProjectByIdUc.js";
import { FindProjectsUc } from "../../application/FindProjectsUc.js";
import { ProjectController } from "../http/ProjectController.js";
import { ProjectRepositorySQLite } from "../persistence/ProjectRepositorySQLite.js";

// Repositories
const projectRepository = new ProjectRepositorySQLite();

// Use cases
const findProjectsUc = new FindProjectsUc(projectRepository);
const createProjectUc = new CreateProjectUc(projectRepository);
const deleteProjectUc = new DeleteProjectUc(projectRepository);
const editProjectUc = new EditProjectUc(projectRepository);
const findProjectById = new FindProjectByIdUc(projectRepository);

// Controller
const controller = new ProjectController(
    findProjectsUc,
    createProjectUc,
    deleteProjectUc,
    editProjectUc,
    findProjectById
);

export default controller;