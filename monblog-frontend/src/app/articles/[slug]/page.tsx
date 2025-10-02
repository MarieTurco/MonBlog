import { fetchArticleBySlug, fetchComments } from '@lib/api';
import { notFound } from 'next/navigation';
import { renderContent } from "@utils/renderContent";
import ArticleComments from '@components/ArticleComments';
import { Article } from '@lib/types';
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default async function ArticlePage({ params }: { params: { slug: string };}) {
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
    <article aria-labelledby="article-title">
      {/* Bouton retour */}
      <div className="mb-4">
        <Link
          href="/"
          className="text-brand-dark hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
        >
          ← Retour à la liste des articles
        </Link>
      </div>
      {/* Image avec ratio 16:9 */}
      {coverUrl && (
        <div className="w-full aspect-[16/9] overflow-hidden rounded-lg mb-6 lg:aspect-[3/1]">
          <img
            src={`${API_URL}${coverUrl}`}
            alt={`Image de couverture pour ${title}`}
            className="w-full h-full object-contain "
          />
        </div>
      )}

      {/* Titre et meta */}
      <h1 id="article-title" className="text-4xl font-bold mb-2 text-brand-dark text-center">{title}</h1>
      <p className="text-sm text-neutral-600 mb-6  text-center">
        Par <span className="font-medium">{author}</span> — {publishedDate}
      </p>

      {/* Contenu */}
      <section className="prose max-w-none mb-10 text-neutral-900">
        {renderContent(content)}
      </section>

      {/* Commentaires */}
      <ArticleComments articleSlug={slug} articleId={documentId} />
    </article>
  );
}
