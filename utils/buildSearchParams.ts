import { type ISearchParams } from "../types/types";

export const buildSearchParams = (params: ISearchParams = {}) => {
  const { search, category, limit, page } = params;
  const searchParams = new URLSearchParams();

  if (search) {
    searchParams.set("search", search);
  }

  if (category && category !== "all") {
    searchParams.set("category", category);
  }

  if (limit) {
    searchParams.set("limit", String(limit));
  }

  if (page) {
    searchParams.set("page", String(page));
  }

  return searchParams.toString();
};
