import Image from "next/image";

import { fetchArticles } from '@lib/api';
import ArticleCard from '@components/ArticleCard';

export default async function Home() {
  const articles = await fetchArticles();
  return (
    <section aria-labelledby="articles-title">
      <h2 id="articles-title" className="text-3xl font-bold mb-6 text-brand-dark">
        Tous les articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}