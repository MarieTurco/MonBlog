import { Article, Comment } from './types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchArticles(): Promise<Article[]> {
    try {
        const res = await fetch(`${API_URL}/api/articles?populate[0]=coverImage`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Erreur HTTP ${res.status}: ${res.statusText}`);
        }
    
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
        throw error;
    }
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
    try {
        const res = await fetch(`${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate[0]=coverImage`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Erreur HTTP ${res.status}: ${res.statusText}`);
        }
    
        const data = await res.json();
        console.log(data.data[0]);
        return data.data[0];
    } catch (error) {
        console.error("Erreur lors de la récupération de l'article:", error);
        throw error;
    }
}

export async function fetchComments(slug: string): Promise<Comment[]> {
try {
        const res = await fetch(`${API_URL}/api/comments?populate[0]=article&filters[article][slug][$eq]=${slug}&sort=createdAt:asc`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Erreur HTTP ${res.status}: ${res.statusText}`);
        }
    
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires:", error);
        throw error;
    }
}

export async function postComment(articleId: string, authorName: string, content: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: { article: articleId, authorName, content },
    }),
  });
  if (!res.ok) throw new Error("Impossible d’envoyer le commentaire");
}
