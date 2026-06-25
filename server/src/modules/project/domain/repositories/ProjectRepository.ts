import type { Project } from "../entities/Project.js";

export interface ProjectRepository {
    findProjects(owner: number): Promise<Project[]>;
    createProject(owner: number, name: string, description: string): Promise<void>;
    deleteProject(id: number): Promise<void>;
    editProject(id: number, field: string, newData: any): Promise<void>;
    findProjectById(id: number): Promise<Project>;
}