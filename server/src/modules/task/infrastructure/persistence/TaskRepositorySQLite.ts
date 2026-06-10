import { getDB } from "../../../../configs/db.js";
import type { Task } from "../../domain/entities/Task.js";
import type { TaskRepository } from "../../domain/repositories/TaskRepository.js";

export class TaskRepositorySQLite implements TaskRepository {
    async findTasks(owner: number): Promise<Task[]> {
        const db = getDB();
        const tasks = await db.all<Task[]>("SELECT * FROM task WHERE owner = ?", [owner]);
        return tasks;
    }

    async createTask(task: Task): Promise<void> {
        const db = getDB();
        await db.run(
            `INSERT INTO task 
            (owner, title, description, createdAt, deadline, status, priority) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [task.owner, task.title, task.description, Date.now(), task.deadline, "nuevo", task.priority]
        );
    }

    async deleteTask(id: number): Promise<void> {
        const db = getDB();
        await db.run(
            `INSERT FROM task WHERE id = ?`,
            [id]
        );
    }

}