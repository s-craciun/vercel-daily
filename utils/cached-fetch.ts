"use cache: remote";

import { API_ROUTES, CACHE_TAGS } from "@/constants/constants";
import { ApiFetch } from "@/lib/api-fetch";
import { type IBreakingNews, type IArticle } from "@/types/article";
import type { ICategory, IApiResponse, ISearchParams } from "@/types/types";
import { cacheLife, cacheTag } from "next/cache";
import { buildSearchParams } from "./buildSearchParams";

export const getAllArticles = async (): Promise<IArticle[]> => {
  cacheTag(CACHE_TAGS.ARTICLES);
  cacheLife("articles");

  try {
    const { data: articles } = await ApiFetch<IApiResponse<IArticle[]>>(
      API_ROUTES.ARTICLES,
    );
    return articles;
  } catch {
    return [];
  }
};

export const getArticlesByParams = async (
  params: ISearchParams = {},
): Promise<IArticle[]> => {
  const query = buildSearchParams(params);
  cacheTag(CACHE_TAGS.FILTERED_ARTICLES);
  cacheLife("articles");

  try {
    const { data: articles } = await ApiFetch<IApiResponse<IArticle[]>>(
      `${API_ROUTES.ARTICLES}${query ? `?${query}` : ""}`,
    );
    return articles;
  } catch {
    return [];
  }
};

export const getFeaturedArticles = async (): Promise<IArticle[]> => {
  cacheTag(CACHE_TAGS.FEATURED_ARTICLES);
  cacheLife("articles");

  try {
    const { data: articles } = await ApiFetch<IApiResponse<IArticle[]>>(
      API_ROUTES.FEATURED,
    );
    return articles;
  } catch {
    return [];
  }
};

export const getTrendingArticles = async (): Promise<IArticle[]> => {
  cacheTag(CACHE_TAGS.TRENDING_ARTICLES);
  cacheLife("articles");

  try {
    const { data: articles } = await ApiFetch<IApiResponse<IArticle[]>>(
      API_ROUTES.TRENDING,
    );
    return articles;
  } catch {
    return [];
  }
};

export const getArticleBySlug = async (slug: string): Promise<IArticle> => {
  cacheTag(CACHE_TAGS.ARTICLE, `${CACHE_TAGS.ARTICLE}-${slug}`);
  cacheLife("articles");

  const { data: article } = await ApiFetch<IApiResponse<IArticle>>(
    `${API_ROUTES.ARTICLES}/${slug}`,
    null,
  );
  return article;
};

export const getBreakingNews = async (): Promise<IBreakingNews | null> => {
  cacheTag(CACHE_TAGS.BREAKING_NEWS);
  cacheLife("minutes");

  try {
    const { data: breakingNews } = await ApiFetch<IApiResponse<IBreakingNews>>(
      API_ROUTES.BREAKING_NEWS,
      null,
      {
        next: {
          revalidate: 60,
        },
      },
    );
    return breakingNews;
  } catch {
    return null;
  }
};

export const getCategories = async (): Promise<ICategory[]> => {
  cacheTag(CACHE_TAGS.CATEGORIES);
  cacheLife("categories");

  try {
    const { data: categories } = await ApiFetch<IApiResponse<ICategory[]>>(
      API_ROUTES.CATEGORIES,
    );
    return categories;
  } catch {
    return [];
  }
};
