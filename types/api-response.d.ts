export interface APIResponse<T> {
    message: string,
    status: "success" | "error",
    data: T
}

export interface APICollectionResponse<T> {
    message: string,
    status: "success" | "error",
    data: Array<T>
}

export interface APIPaginationResponse<T> {
    message: string,
    status: "success" | "error",
    data: {
        records: Array<T>,
        is_paginating: boolean,
        pagination: PaginationResponse
    }
}

export interface PaginationResponse {
    total: int,
    count: int,
    per_page: int,
    current_page: int,
    total_pages: int,
    from: int,
    to: int,
    pages: Array<PaginationPages>
}

export interface PaginationPages {
    label: string,
    active: boolean,
    page_number: number | null
}