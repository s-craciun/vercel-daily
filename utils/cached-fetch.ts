"use cache";

import { ApiFetch } from "@/lib/api-fetch";
import { type IBreakingNews, type IArticle } from "@/types/article";
import type { ICategory, IApiResponse, ISearchParams } from "@/types/types";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";

export const getAllArticles = async (): Promise<IArticle[]> => {
  cacheTag("articles");
  cacheLife("articles");

  const {
    data: { data: articles },
  } = await ApiFetch<IApiResponse<IArticle[]>>("/articles");
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
  cacheTag("filtered-articles");
  cacheLife("articles");

  const {
    data: { data: articles },
  } = await ApiFetch<IApiResponse<IArticle[]>>(
    `/articles${query ? `?${query}` : ""}`
  );
  return articles;
};

export const getFeaturedArticles = async (): Promise<IArticle[]> => {
  cacheTag("featured-articles");
  cacheLife("articles");

  const {
    data: { data: articles },
  } = await ApiFetch<IApiResponse<IArticle[]>>("/articles?featured=true");
  return articles;
};

export const getTrendingArticles = async (): Promise<IArticle[]> => {
  cacheTag("trending-articles");
  cacheLife("articles");

  const {
    data: { data: articles },
  } = await ApiFetch<IApiResponse<IArticle[]>>("/articles/trending");
  return articles;
};

export const getArticleBySlug = cache(
  async (slug: string): Promise<IArticle> => {
    cacheTag("articles");
    cacheTag("article-" + slug);
    cacheLife("articles");

    const {
      data: { data: article },
    } = await ApiFetch<IApiResponse<IArticle>>(`/articles/${slug}`, null, {
      next: { revalidate: 60 },
    });
    return article;
  }
);

export const getBreakingNews = async (): Promise<IBreakingNews> => {
  cacheTag("breaking-news");
  cacheLife({ expire: 60 });

  const {
    data: { data: breakingNews },
  } = await ApiFetch<IApiResponse<IBreakingNews>>("/breaking-news");
  return breakingNews;
};

export const getCategories = async (): Promise<ICategory[]> => {
  cacheTag("categories");
  cacheLife("articles");

  const {
    data: { data: categories },
  } = await ApiFetch<IApiResponse<ICategory[]>>("/categories");
  return categories;
};
