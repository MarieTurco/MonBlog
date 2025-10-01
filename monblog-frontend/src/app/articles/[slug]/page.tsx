import { fetchArticleBySlug, fetchComments } from '@lib/api';
import { notFound } from 'next/navigation';
import { renderContent } from "@utils/renderContent";
import ArticleComments from '@components/ArticleComments';
import { Article } from '@lib/types';

interface Props {
  params: { slug: string };
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article: Article | null = await fetchArticleBySlug(slug);
  if (!article) return notFound();

  const author = article.authorName;
  const title = article.title;
  const coverUrl = article.coverImage?.url;
  const documentId = article.documentId;
  const content = article.content;

  const publishedDate = article.publishedAt
  ? new Date(article.publishedAt).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  : "Non publié";

  const comments = await fetchComments(slug);

  return (
    <main className="container mx-auto p-4">
      <img src={`${API_URL}${coverUrl}`} alt={title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Par {author} - {publishedDate}
      </p>
      <article className="prose max-w-none mb-8">
        {renderContent(content)}
      </article>
      <ArticleComments articleSlug={slug} articleId={documentId} />
    </main>
  );
}
