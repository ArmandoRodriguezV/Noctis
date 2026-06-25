import type { ProjectRepository } from "../../domain/repositories/ProjectRepository.js";
import { getDB } from "../../../../configs/db.js";
import type { Project } from "../../domain/entities/Project.js";
import type { Member } from "../../domain/entities/Member.js";

export class ProjectRepositorySQLite implements ProjectRepository {

    async findProjects(id: number): Promise<Project[]> {
        const db = getDB();
        const projects = await db.all<Project[]>(
            `SELECT * FROM project WHERE owner = ?`,
            [id]
        );
        return projects;
    }

    async createProject(owner: number, name: string, description: string): Promise<void> {
        const db = getDB();
        const project = await db.get<Project>(
            `INSERT INTO project (name, description, createdAt, owner) VALUES (?, ?, ?, ?) RETURNING *`,
            [name, description, Date.now(), owner]
        );
        await db.run(
            `INSERT INTO member (user, project, access) VALUES (?, ?, ?)`,
            [owner, project?.id, 1]
        )
    }

    async deleteProject(id: number): Promise<void> {
        const db = getDB();
        await db.run(`DELETE FROM task WHERE owner = ?`, [id]);
        await db.run(`DELETE FROM project WHERE id = ?`, [id]);
    }

    async editProject(id: number, field: string, newData: any): Promise<void> {
        const db = getDB();

        const allowedColumns = ["name", "description", "isArchiver"];
        if (!allowedColumns.includes(field)) throw new Error("Edición no permitida");

        await db.run(
            `UPDATE project SET ${field} = ? WHERE id = ?`,
            [newData, id]
        );
    }

    async findProjectById(id: number): Promise<Project> {
        const db = getDB();
        const proj = await db.get(`SELECT * FROM project WHERE id = ?`, [id]);
        return proj;
    }
}