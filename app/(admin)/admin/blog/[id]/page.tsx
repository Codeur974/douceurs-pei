'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useArticlesStore } from '@/lib/stores';
import { ArticleForm } from '@/components/admin/ArticleForm';

export default function EditerArticle() {
  const params = useParams();
  const id = params.id as string;
  const { articles } = useArticlesStore();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <Link href="/admin/blog" className="text-primary hover:underline">
          Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Modifier l&apos;article</h1>
      <ArticleForm article={article} />
    </div>
  );
}
