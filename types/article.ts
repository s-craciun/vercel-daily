import { type ArticleContentBlock } from "./article-content";

export interface IArticle {
  id: string;
  author: { name: string; avatar: string };
  category: string;
  content: ArticleContentBlock[];
  excerpt: string;
  featured: boolean;
  image: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  title: string;
}

export interface IBreakingNews {
  articleId: string;
  category: string;
  headline: string;
  id: string;
  publishedAt: string;
  summary: string;
  urgent: boolean;
}
