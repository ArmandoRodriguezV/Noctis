export interface Task {
    id?: number;
    owner?: number;
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    deadline?: number;
    sendNotification?: number;
    createdAt?: number;
}