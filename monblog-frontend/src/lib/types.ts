export interface User {
  id: number;
  username: string;
}

export interface Media {
  id: number;
  url: string;
  name?: string;
  alternativeText?: string | null;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: any; // Rich Text JSON de Strapi
  coverImage?: Media;
  users_permissions_user?: User;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface Comment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}
