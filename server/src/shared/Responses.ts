interface CustomResponse {
    message: string;
    status: number;
    content?: any;
}

export const allResponses = {
    success: (message: string, content?: any): CustomResponse => { return { message, status: 200, content } },
    error: (message: string = "Server internal error"): CustomResponse => { return { message, status: 500 } },
    warning: (message: string, status: number): CustomResponse => { return { message, status } }
}