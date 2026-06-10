import type { Request, Response } from "express";
import { allResponses } from "../../../../shared/Responses.js";
import type { CreateTaskUc } from "../../application/CreateTaskUc.js";
import type { CreateTaskDTO } from "../../application/DTO/CreateTaskDTO.js";

export class TaskController {
    constructor(
        private createTaskUc: CreateTaskUc
    ) { }

    createTask = async (req: Request, res: Response) => {
        try {
            const { owner } = req.query;
            const { title, description, deadline, priority } = req.body;
            
            const dto: CreateTaskDTO = {
                owner: Number(owner),
                deadline: deadline,
                title,
                description,
                priority
            }

            await this.createTaskUc.exec(dto);
            res.status(200).json(allResponses.success("Tarea creada"));
        } catch(err) {
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }
}