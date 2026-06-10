import type { Task } from "../../../task/domain/entities/Task.js";

export interface NotificationRepository {
    findTaskWithDeadline(): Promise<Task[]>;
    addNotification(id: number, counter: number): Promise<void>;
}