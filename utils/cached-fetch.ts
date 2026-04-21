"use cache";

import { API_ROUTES, CACHE_TAGS } from "@/constants/constants";
import { ApiFetch } from "@/lib/api-fetch";
import { type IBreakingNews, type IArticle } from "@/types/article";
import type { ICategory, IApiResponse, ISearchParams } from "@/types/types";
import { cacheLife, cacheTag } from "next/cache";

export const getAllArticles = async (): Promise<IArticle[]> => {
  cacheTag(CACHE_TAGS.ARTICLES);
  cacheLife("articles");

  const {
    data: { data: articles },
  } = await ApiFetch<IApiResponse<IArticle[]>>(API_ROUTES.ARTICLES);
  return articles;
};

export const getArticlesByParams = async (
  params: ISearchParams = {}
): Promise<IArticle[]> => {
  const { search, category, limit, page } = params;
  const searchParams = new URLSearchParams();

  if (search) {
    searchParams.set("search", search);
  }

  if (category) {
    searchParams.set("category", category);
  }

  if (limit) {
    searchParams.set("limit", String(limit));
  }

  if (page) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();
  cacheTag(CACHE_TAGS.FILTERED_ARTICLES);
  cacheLife("articles");

  const {
    data: { data: articles },
  } = await ApiFetch<IApiResponse<IArticle[]>>(
    `${API_ROUTES.ARTICLES}${query ? `?${query}` : ""}`
  );
  return articles;
};

export const getFeaturedArticles = async (): Promise<IArticle[]> => {
  cacheTag(CACHE_TAGS.FEATURED_ARTICLES);
  cacheLife("articles");

  const {
    data: { data: articles },
  } = await ApiFetch<IApiResponse<IArticle[]>>(API_ROUTES.FEATURED);
  return articles;
};

export const getTrendingArticles = async (): Promise<IArticle[]> => {
  cacheTag(CACHE_TAGS.TRENDING_ARTICLES);
  cacheLife("articles");

  const {
    data: { data: articles },
  } = await ApiFetch<IApiResponse<IArticle[]>>(API_ROUTES.TRENDING);
  return articles;
};

export const getArticleBySlug = async (slug: string): Promise<IArticle> => {
  cacheTag(CACHE_TAGS.ARTICLE, `${CACHE_TAGS.ARTICLE}-${slug}`);
  cacheLife("articles");

  const {
    data: { data: article },
  } = await ApiFetch<IApiResponse<IArticle>>(
    `${API_ROUTES.ARTICLES}/${slug}`,
    null,
    {
      next: { revalidate: 60 },
    }
  );
  return article;
};

export const getBreakingNews = async (): Promise<IBreakingNews> => {
  cacheTag(CACHE_TAGS.BREAKING_NEWS);
  cacheLife({ expire: 60 });

  const {
    data: { data: breakingNews },
  } = await ApiFetch<IApiResponse<IBreakingNews>>(API_ROUTES.BREAKING_NEWS);
  return breakingNews;
};

export const getCategories = async (): Promise<ICategory[]> => {
  cacheTag(CACHE_TAGS.CATEGORIES);
  cacheLife("categories");

  const {
    data: { data: categories },
  } = await ApiFetch<IApiResponse<ICategory[]>>(API_ROUTES.CATEGORIES);
  return categories;
};
