import type { Request, Response } from "express";
import type { CreateProjectUc } from "../../application/project/CreateProjectUc.js";
import type { DeleteProjectUc } from "../../application/project/DeleteProjectUc.js";
import { allResponses } from "../../../../shared/Responses.js";
import type { FindProjectsUc } from "../../application/project/FindProjectsUc.js";
import type { EditProjectUc } from "../../application/project/EditProjectUc.js";
import type { FindProjectByIdUc } from "../../application/project/FindProjectByIdUc.js";
import type { FindMemberUc } from "../../application/member/FindMemberUc.js";

export class ProjectController {
    constructor(
        private findProjectsUc: FindProjectsUc,
        private createProjectUc: CreateProjectUc,
        private deleteProjectUc: DeleteProjectUc,
        private editProjectUc: EditProjectUc,
        private findProjectById: FindProjectByIdUc,
        private findMemberUc: FindMemberUc
    ) { }

    findProjects = async (req: Request, res: Response) => {
        try {
            const id = req.user?.id;
            const data = await this.findProjectsUc.exec(id!);
            const memberships = await this.findMemberUc.exec(id!);

            const projects = []
            for (let i = 0; i < data.length; i++) {
                const proj = data[i]!;
                const memb = memberships[i]!;
                
                const object = {
                    ...proj,
                    access: memb.access
                }
                projects.push(object)
            }

            res.status(200).json(allResponses.success("", projects));
        } catch (err) {
            console.log(err);
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }

    createProject = async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            await this.createProjectUc.exec(req.user?.id!, name, description);

            res.status(200).json(allResponses.success("Proyecto creado correctamente"));
        } catch (err) {
            console.log(err);
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }

    deleteProject = async (req: Request, res: Response) => {
        try {
            const {id} = req.query;
            await this.deleteProjectUc.exec(Number(id));
            res.status(200).json(allResponses.success("Proyecto borrado"));
        } catch (err) {
            console.log(err);
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }
}