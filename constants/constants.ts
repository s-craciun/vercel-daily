export const SUBSCRIPTION_TOKEN_NAME = "subscription_token";

export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum API_ROUTES {
  ARTICLES = "/articles",
  BREAKING_NEWS = "/breaking-news",
  CATEGORIES = "/categories",
  TRENDING = "/articles/trending",
  FEATURED = "/articles?featured=true",
  CREATE_SUBSCRIPTION = "/subscription/create",
  SUBSCRIPTION = "/subscription",
}

export enum CACHE_TAGS {
  ARTICLES = "articles",
  FILTERED_ARTICLES = "filtered-articles",
  FEATURED_ARTICLES = "featured-articles",
  TRENDING_ARTICLES = "trending-articles",
  BREAKING_NEWS = "breaking-news",
  CATEGORIES = "categories",
  ARTICLE = "article",
}

export enum ButtonVariants {
  DEFAULT = "default",
  OUTLINE = "outline",
  LINK = "link",
}

export const DOT = "•";

export const CONTAINER_PADDING =
  "py-5 px-15 md:py-10 md:px-25 lg:py-15 sm:px-40";
export const GRID_CONTAINER =
  "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12";
