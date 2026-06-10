import { getDB } from "../../../../configs/db.js";
import type { Task } from "../../../task/domain/entities/Task.js";
import type { NotificationRepository } from "../../domain/repositories/NotificationRepository.js";

export class NotificationRepositorySQLite implements NotificationRepository {
    async addNotification(id: number, counter: number): Promise<void> {
        const db = getDB();
        await db.run(`UPDATE task SET sendNotification = ? WHERE id = ?`, [counter, id]);
    }

    async findTaskWithDeadline(): Promise<Task[]> {
        const db = getDB();
        const results = await db.all(`SELECT * FROM task WHERE deadline IS NOT NULL`);
        return results;
    }
}