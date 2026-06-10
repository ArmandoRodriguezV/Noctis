import { Router } from "express";
import controller from "../di/ProjectDI.js";
import { authMiddleware } from '../../../user/infrastructure/di/UserDI.js';

const projectRouter = Router();

projectRouter.get("/", authMiddleware.handle.bind(authMiddleware), controller.findProjects);
projectRouter.post("/create", authMiddleware.handle.bind(authMiddleware), controller.createProject);
projectRouter.delete("/delete", authMiddleware.handle.bind(authMiddleware), controller.deleteProject);
projectRouter.patch("/edit/archive", authMiddleware.handle.bind(authMiddleware), controller.archiveProject);
projectRouter.patch("/edit/unarchive", authMiddleware.handle.bind(authMiddleware), controller.unarchiveProject);

export default projectRouter;