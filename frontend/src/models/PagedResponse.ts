export interface PagedResponse<T> {
    data: T[];
    count: number;
    page: number;
    pageSize: number;
}