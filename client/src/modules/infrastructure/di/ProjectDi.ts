import { GetMyProjectsUc } from "../../application/Projects/GetMyProjectsUc";
import { ProjectApiRepository } from "../http/ProjectApiRepository";

// Repositories
const projectRepository = new ProjectApiRepository();

// Use cases
const getMyProjectsUc = new GetMyProjectsUc(projectRepository);

// exports
export { getMyProjectsUc }