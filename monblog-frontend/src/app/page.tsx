import Image from "next/image";

import { fetchArticles } from '@lib/api';
import ArticleCard from '@components/ArticleCard';

export default async function Home() {
  const articles = await fetchArticles();
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tous les articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}