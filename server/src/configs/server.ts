import express from 'express';
import cors from 'cors';
import projectRouter from '../modules/project/infrastructure/http/ProjectRouter.js';
import taskRouter from '../modules/task/infrastructure/http/TaskRouter.js';
import catalogRouter from '../modules/catalog/infrastructure/http/CatalogRouter.js';
import userRouter from '../modules/user/infrastructure/http/UserRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/project", projectRouter);
app.use("/task", taskRouter);
app.use("/catalog", catalogRouter);
app.use("/user", userRouter);

export default app;