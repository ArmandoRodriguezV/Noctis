import type { Task } from "../entities/Task.js";

export interface TaskRepository {
    findTasks(owner: number): Promise<Task[]>;
    createTask(task: Task): Promise<void>;
    deleteTask(id: number): Promise<void>;
}