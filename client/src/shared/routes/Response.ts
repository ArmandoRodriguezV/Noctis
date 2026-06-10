export interface ApiResponse<T> {
    message: string;
    status: number;
    content?: T;
}