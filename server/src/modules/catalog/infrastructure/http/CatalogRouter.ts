import { Router } from "express";
import controller from "../di/CatalogDI.js";

const catalogRouter = Router();

catalogRouter.get("/priorities", controller.getPriorities);

export default catalogRouter;