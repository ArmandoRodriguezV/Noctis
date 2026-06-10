import cron from 'node-cron';
import type { SendDeeadLineNotificationUc } from "../../application/SendDeeadLineNotificationUc.js";
import { wsClientsService } from '../../../user/infrastructure/di/UserDI.js';
import type { GetUserByIdUc } from '../../../user/application/GetUserByIdUc.js';
import type { FindProjectByIdUc } from '../../../project/application/FindProjectByIdUc.js';
import type { AddNotificationInTaskUc } from '../../application/AddNotificationInTaskUc.js';
import { sendEmail } from '../../../../shared/mail/mailer.js';

export class Cron {
    constructor(
        private sendDeeadLineNotificationUc: SendDeeadLineNotificationUc,
        private addNotificationInTaskUc: AddNotificationInTaskUc,
        private findProjectByIdUc: FindProjectByIdUc,
        private getUserByIdUc: GetUserByIdUc
    ) { }

    init() {
        cron.schedule('*/10 * * * * *', async () => {
            const tasks = await this.sendDeeadLineNotificationUc.exec();
            if (tasks.length < 0) return;
            
            const now = Date.now();

            for (const task of tasks) {
                // Validate user
                const project = await this.findProjectByIdUc.exec(task.owner!);
                const user = await this.getUserByIdUc.exec(project.owner!);

                const diff = task.deadline! - now;
                const FIFTEEN_MINUTES = 15 * 60 * 1000;
                
                // 15 minutos
                if (
                    task.sendNotification! < 1 &&
                    diff > 0 &&
                    diff <= FIFTEEN_MINUTES
                ) {
                    const pending = Math.trunc(diff / (1000 * 60));

                    wsClientsService.send(user.id!, `Esta tarea está por caducar, quedan ${pending} minutos`);
                    await sendEmail(
                        user.email!,
                        "Tiempo límite",
                        `<h1>El tiempo esta por acabarse, te quedan ${pending} minutos</h1>`
                    );

                    await this.addNotificationInTaskUc.exec(task.id!, 3);
                }
            }
        });
    }
}