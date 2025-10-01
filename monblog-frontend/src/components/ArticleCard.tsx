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
    <Link href={`/articles/${article.slug}`} className="block border rounded shadow hover:shadow-lg transition">
      {coverUrl && (
        <img
          src={`${API_URL}${coverUrl}`}
          alt={title}
          className="w-full h-48 object-cover rounded-t"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">Par {author}</p>
        <p className="text-sm text-gray-400">{publishedDate}</p>
      </div>
    </Link>
  );
}