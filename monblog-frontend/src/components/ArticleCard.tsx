import Link from 'next/link';
import { Article } from '../lib/types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function ArticleCard({ article }: { article: Article }) {
  const author = article.authorName;
  const title = article.title;
  const coverUrl = article.coverImage?.url;
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : "Non publié";

  return (
    <Link href={`/articles/${article.slug}`} 
          className="block bg-white border rounded-lg shadow-md hover:shadow-lg focus:ring-2 transition"
          aria-label={`Lire l'article : ${title}`}
    >
      {coverUrl && (
        <img
          src={`${API_URL}${coverUrl}`}
          alt={title}
          className="w-full h-56 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold text-neutral-9OO">{title}</h2>
        <p className="text-sm text-neutral-600">Par {author}</p>
        <p className="text-sm text-neutral-500">{publishedDate}</p>
      </div>
    </Link>
  );
}