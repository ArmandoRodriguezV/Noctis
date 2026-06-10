import type { Request, Response } from "express";
import type { CreateProjectUc } from "../../application/CreateProjectUc.js";
import type { DeleteProjectUc } from "../../application/DeleteProjectUc.js";
import { allResponses } from "../../../../shared/Responses.js";
import type { FindProjectsUc } from "../../application/FindProjectsUc.js";
import type { EditProjectUc } from "../../application/EditProjectUc.js";
import type { FindProjectByIdUc } from "../../application/FindProjectByIdUc.js";

export class ProjectController {
    constructor(
        private findProjectsUc: FindProjectsUc,
        private createProjectUc: CreateProjectUc,
        private deleteProjectUc: DeleteProjectUc,
        private editProjectUc: EditProjectUc,
        private findProjectById: FindProjectByIdUc
    ) { }

    findProjects = async (req: Request, res: Response) => {
        try {
            const id = req.user?.id;
            const data = await this.findProjectsUc.exec(id!);
            res.status(200).json(allResponses.success("", data));
        } catch (err) {
            console.log(err);
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }

    createProject = async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            await this.createProjectUc.exec(req.user?.id!, name, description);

            res.status(200).json(allResponses.success("Proyecto generado correctamente"));
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
            const { id } = req.query;
            const proj = await this.findProjectById.exec(Number(id));

            if (proj.isArchiver === 0) {
                await this.editProjectUc.exec(Number(id), "isArchiver", "1");
                res.status(200).json(allResponses.success(`El proyecto "**${proj.name}**" ha sido archivado`));
                return
            }
            
            res.status(409).json(allResponses.warning(`Este proyecto ya esta archivado`, 409));
        } catch (err) {
            console.error(err);
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }

    unarchiveProject = async (req: Request, res: Response) => {
        try {
            const { id } = req.query;
            const proj = await this.findProjectById.exec(Number(id));

            if (proj.isArchiver === 1) {
                await this.editProjectUc.exec(Number(id), "isArchiver", "0");
                res.status(200).json(allResponses.success(`El proyecto "**${proj.name}**" ha sido desarchivado`));
                return
            }
            
            res.status(409).json(allResponses.warning(`Este proyecto ya esta activo`, 409));
        } catch (err) {
            console.error(err);
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }
}