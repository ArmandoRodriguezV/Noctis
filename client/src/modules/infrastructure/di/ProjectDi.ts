import { DeleteProjectUc } from "../../application/Projects/DeleteProjectUc";
import { GetMyProjectsUc } from "../../application/Projects/GetMyProjectsUc";
import { ProjectApiRepository } from "../http/ProjectApiRepository";

// Repositories
const projectRepository = new ProjectApiRepository();

// Use cases
const getMyProjectsUc = new GetMyProjectsUc(projectRepository);
const deleteProjectUc = new DeleteProjectUc(projectRepository);

// exports
export { getMyProjectsUc, deleteProjectUc }