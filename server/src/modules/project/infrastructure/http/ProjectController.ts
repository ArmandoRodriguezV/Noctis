import type { Request, Response } from "express";
import type { CreateProjectUc } from "../../application/project/CreateProjectUc.js";
import type { DeleteProjectUc } from "../../application/project/DeleteProjectUc.js";
import { allResponses } from "../../../../shared/Responses.js";
import type { FindProjectsUc } from "../../application/project/FindProjectsUc.js";
import type { FindMemberUc } from "../../application/member/FindMemberUc.js";
import type { ArchiverProjectUc } from "../../application/project/ArchiveProjectUc.js";

export class ProjectController {
    constructor(
        private findProjectsUc: FindProjectsUc,
        private createProjectUc: CreateProjectUc,
        private deleteProjectUc: DeleteProjectUc,
        private findMemberUc: FindMemberUc,
        private archiveProjectUc: ArchiverProjectUc
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

    archiveProject = async (req: Request, res: Response) => {
        try {
            const {id} = req.query;
            const resp = await this.archiveProjectUc.exec(Number(id)); 
            res.status(200).json(allResponses.success(resp));
        } catch (err) {
            console.log(err);
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }
}