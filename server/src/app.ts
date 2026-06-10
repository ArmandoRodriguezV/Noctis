import dotenv from 'dotenv';
import { connectDb } from './configs/db.js';
import app from './configs/server.js';
import { bootstrapWs } from './configs/ws.js';
import cron from './modules/notifications/infrastructure/di/NotificationDI.js';
dotenv.config();

const PORT = process.env.PORT;

async function bootstrap() {
    await connectDb();
    cron.init();
    bootstrapWs();
    app.listen(PORT, () => {
        console.log(`🟢 Server run in port ${PORT}`);
    });
}

bootstrap();