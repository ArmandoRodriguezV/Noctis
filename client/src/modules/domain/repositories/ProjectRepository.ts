import type { ApiResponse } from "../../../shared/routes/Response";
import type { Project } from "../entities/Project";

export interface ProjectRepository {
    getProjects(): Promise<ApiResponse<Project[]>>;
    deleteProject(id: number): Promise<ApiResponse<void>>;
    createProject(name: string, description: string): Promise<ApiResponse<void>>;
    archiveProject(id: number): Promise<ApiResponse<void>>;
}