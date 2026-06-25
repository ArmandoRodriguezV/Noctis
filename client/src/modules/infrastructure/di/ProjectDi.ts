import { ArchiveProjectUc } from "../../application/Projects/ArchiveProjectUc";
import { CreateProjectUc } from "../../application/Projects/CreateProjectUC";
import { DeleteProjectUc } from "../../application/Projects/DeleteProjectUc";
import { GetMyProjectsUc } from "../../application/Projects/GetMyProjectsUc";
import { ProjectApiRepository } from "../http/ProjectApiRepository";

// Repositories
const projectRepository = new ProjectApiRepository();

// Use cases
const getMyProjectsUc = new GetMyProjectsUc(projectRepository);
const deleteProjectUc = new DeleteProjectUc(projectRepository);
const createProjectUc = new CreateProjectUc(projectRepository);
const archiveProjectUc = new ArchiveProjectUc(projectRepository);

// exports
export { getMyProjectsUc, deleteProjectUc, createProjectUc, archiveProjectUc }