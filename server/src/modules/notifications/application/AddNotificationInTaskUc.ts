import type { NotificationRepository } from "../domain/repositories/NotificationRepository.js";

export class AddNotificationInTaskUc {
    constructor(
        private notificationRepository: NotificationRepository
    ) {}

    async exec(id: number, counter: number) {
        await this.notificationRepository.addNotification(id, counter);
    }
}