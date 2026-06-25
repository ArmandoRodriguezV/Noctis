import { FindMemberUc } from "../../application/member/FindMemberUc.js";
import { ArchiverProjectUc } from "../../application/project/ArchiveProjectUc.js";
import { CreateProjectUc } from "../../application/project/CreateProjectUc.js";
import { DeleteProjectUc } from "../../application/project/DeleteProjectUc.js";
import { FindProjectsUc } from "../../application/project/FindProjectsUc.js";
import { ProjectController } from "../http/ProjectController.js";
import { MemeberRepositorySQLite } from "../persistence/MemberRepositorySQLite.js";
import { ProjectRepositorySQLite } from "../persistence/ProjectRepositorySQLite.js";

// Repositories
const projectRepository = new ProjectRepositorySQLite();
const memberRepository = new MemeberRepositorySQLite();

// Use cases
const findProjectsUc = new FindProjectsUc(projectRepository);
const createProjectUc = new CreateProjectUc(projectRepository);
const deleteProjectUc = new DeleteProjectUc(projectRepository);
const findMemberUc = new FindMemberUc(memberRepository);
const archiverProjectUc = new ArchiverProjectUc(projectRepository);

// Controller
const controller = new ProjectController(
    findProjectsUc,
    createProjectUc,
    deleteProjectUc,
    findMemberUc,
    archiverProjectUc
);

export default controller;