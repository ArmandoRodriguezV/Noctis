import { api } from "../../../shared/routes/Api";
import type { ApiResponse } from "../../../shared/routes/Response";
import type { Project } from "../../domain/entities/Project";
import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class ProjectApiRepository implements ProjectRepository {
    async getProjects(): Promise<ApiResponse<Project[]>> {
        try {
            const res = await api.get<ApiResponse<Project[]>>("/project");
            return res.data;
        } catch (err) {
            return err as ApiResponse<any>;
        }
    }

    async deleteProject(id: number): Promise<ApiResponse<void>> {
           try {
            const res = await api.delete<ApiResponse<void>>(`/project/delete?id=${id}`);
            return res.data;
        } catch (err) {
            return err as ApiResponse<any>;
        }
    }
}