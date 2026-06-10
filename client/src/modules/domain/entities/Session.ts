export interface Session {
    id: number;
    owner: number;
    token: string;
    active: number;
    createdAt: number;
    closedAt: number;
}