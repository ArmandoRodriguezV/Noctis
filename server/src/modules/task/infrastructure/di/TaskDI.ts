import { ProjectRepositorySQLite } from "../../../project/infrastructure/persistence/ProjectRepositorySQLite.js";
import { CreateTaskUc } from "../../application/CreateTaskUc.js";
import { TaskController } from "../http/TaskController.js";
import { TaskRepositorySQLite } from "../persistence/TaskRepositorySQLite.js";

// Repositories
const taskRepository = new TaskRepositorySQLite();
const projectRepository = new ProjectRepositorySQLite();

// Use cases
const createTaskUc = new CreateTaskUc(taskRepository, projectRepository);

// Controller
const controller = new TaskController(
    createTaskUc
);

export default controller