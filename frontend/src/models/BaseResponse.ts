interface BaseResponse<T> {
    data?: T;
    message: string;
    success: boolean;
    errors: string[];
    statusCode: number;
}