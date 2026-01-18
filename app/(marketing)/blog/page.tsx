'use client';

import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { useBlogStore, useArticlesStore } from '@/lib/stores';

export default function Blog() {
  const { filter, setFilter } = useBlogStore();
  const { articles } = useArticlesStore();

  const filteredArticles = filter === 'tous'
    ? articles.filter(a => a.published)
    : articles.filter(a => a.category === filter && a.published);

  // Pattern SVG en base64 avec motifs pâtisserie
  const patternSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <!-- Fouet -->
      <g transform="translate(10, 10) scale(0.4)" opacity="0.07">
        <ellipse cx="25" cy="45" rx="8" ry="20" fill="none" stroke="%238DB600" stroke-width="2"/>
        <ellipse cx="25" cy="45" rx="14" ry="25" fill="none" stroke="%238DB600" stroke-width="2"/>
        <ellipse cx="25" cy="45" rx="20" ry="30" fill="none" stroke="%238DB600" stroke-width="2"/>
        <rect x="22" y="70" width="6" height="25" rx="2" fill="%238DB600"/>
      </g>
      <!-- Cupcake -->
      <g transform="translate(55, 55) scale(0.35)" opacity="0.07">
        <path d="M10 50 L15 30 L45 30 L50 50 Z" fill="%23B8860B"/>
        <circle cx="30" cy="22" r="15" fill="%238DB600"/>
        <circle cx="22" cy="18" r="8" fill="%238DB600"/>
        <circle cx="38" cy="18" r="8" fill="%238DB600"/>
        <circle cx="30" cy="10" r="5" fill="%23B8860B"/>
      </g>
      <!-- Toque -->
      <g transform="translate(60, 5) scale(0.3)" opacity="0.07">
        <rect x="15" y="50" width="40" height="8" rx="2" fill="%238DB600"/>
        <ellipse cx="35" cy="30" rx="25" ry="22" fill="%238DB600"/>
        <circle cx="25" cy="25" r="10" fill="%23fff"/>
        <circle cx="40" cy="20" r="12" fill="%23fff"/>
        <circle cx="35" cy="35" r="8" fill="%23fff"/>
      </g>
    </svg>
  `;
  const encodedPattern = `data:image/svg+xml,${encodeURIComponent(patternSvg)}`;

  return (
    <div
      className="min-h-screen pb-12"
      style={{
        backgroundColor: '#fdfbf7',
        backgroundImage: `url("${encodedPattern}")`,
        backgroundSize: '150px 150px'
      }}
    >
      <Nav />

      <div className="container mx-auto px-4 pt-4">
        <h1 className="text-4xl font-bold mb-4 text-primary">Blog & Ateliers</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Astuces de pâtissier et retours en images de mes ateliers à domicile.
        </p>

      {/* Filtres */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setFilter('tous')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === 'tous'
              ? 'bg-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setFilter('atelier')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === 'atelier'
              ? 'bg-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Ateliers
        </button>
        <button
          onClick={() => setFilter('article')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === 'article'
              ? 'bg-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Articles
        </button>
      </div>

      {/* Liste des articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image avec badge */}
            <div className="relative h-44 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-primary/40">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {/* Badge catégorie */}
              <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
                article.category === 'atelier'
                  ? 'bg-secondary text-white'
                  : 'bg-primary text-white'
              }`}>
                {article.category === 'atelier' ? 'Atelier' : 'Article'}
              </span>
            </div>

            {/* Contenu */}
            <div className="p-5">
              {/* Date et lieu */}
              <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(article.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
                {article.location && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {article.location}
                  </span>
                )}
              </div>

              {/* Titre */}
              <h2 className="!text-lg !font-bold !font-sans mb-2 text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h2>

              {/* Extrait */}
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {article.excerpt}
              </p>

              {/* Lien */}
              <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Lire la suite
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          Aucun article dans cette catégorie pour le moment.
        </p>
      )}
      </div>
    </div>
  );
}
