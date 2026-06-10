import type { NotificationRepository } from "../domain/repositories/NotificationRepository.js";

export class SendDeeadLineNotificationUc {
    constructor(
        private notificationRepository: NotificationRepository
    ) {}

    async exec() {
        return await this.notificationRepository.findTaskWithDeadline();
    }
}