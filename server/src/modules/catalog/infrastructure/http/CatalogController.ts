import type { Request, Response } from "express";
import type { GetPrioritiesUc } from "../../application/GetPrioritiesUc.js";
import { allResponses } from "../../../../shared/Responses.js";

export class CatalogController {
    constructor(
        private getPrioritiesUc: GetPrioritiesUc
    ) { }

    getPriorities = async (_req: Request, res: Response) => {
        try {
            const data = await this.getPrioritiesUc.exec();
            res.status(200).json(allResponses.success("Lista de prioridades", data));
        } catch (err) {
            console.error(err);
            res.status(500).json(allResponses.error());
        }
    }
}