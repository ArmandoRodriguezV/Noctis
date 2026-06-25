import { FindProjectByIdUc } from "../../../project/application/project/FindProjectByIdUc.js";
import { ProjectRepositorySQLite } from "../../../project/infrastructure/persistence/ProjectRepositorySQLite.js";
import { GetUserByIdUc } from "../../../user/application/GetUserByIdUc.js";
import { UserRepositorySQLite } from "../../../user/infrastructure/persistence/UserRepositorySQLite.js";
import { AddNotificationInTaskUc } from "../../application/AddNotificationInTaskUc.js";
import { SendDeeadLineNotificationUc } from "../../application/SendDeeadLineNotificationUc.js";
import { Cron } from "../cron/Cron.js";
import { NotificationRepositorySQLite } from "../persistence/NotificationRepositorySQLite.js";

// Repositories
const notificationRepository = new NotificationRepositorySQLite();
const projectRepository = new ProjectRepositorySQLite();
const userRepository = new UserRepositorySQLite();

// UseCases
const sendDeeadLineNotificationUc = new SendDeeadLineNotificationUc(notificationRepository);
const addNotificationInTaskUc = new AddNotificationInTaskUc(notificationRepository);
const findProjectByIdUc = new FindProjectByIdUc(projectRepository);
const getUserByIdUc = new GetUserByIdUc(userRepository);

// exports
const cron = new Cron(sendDeeadLineNotificationUc, addNotificationInTaskUc, findProjectByIdUc, getUserByIdUc);

export default cron;