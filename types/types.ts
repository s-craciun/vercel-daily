export type IPagination = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    pagination?: IPagination;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface ISearchParams {
  search?: string;
  category?: string;
  limit?: number;
  page?: number;
}

export interface ICategory {
  articleCount: number;
  name: string;
  slug: string;
}
