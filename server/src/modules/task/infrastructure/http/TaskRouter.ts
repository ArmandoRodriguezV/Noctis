import { Router } from "express";
import controller from "../di/TaskDI.js";
import { authMiddleware } from "../../../user/infrastructure/di/UserDI.js";

const taskRouter = Router();

taskRouter.post("/create", authMiddleware.handle.bind(authMiddleware), controller.createTask);

export default taskRouter;