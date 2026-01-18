import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'atelier' | 'article';
  date: string;
  location?: string;
  published: boolean;
}

interface ArticlesState {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, data: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getArticleBySlug: (slug: string) => Article | undefined;
  getArticlesByCategory: (category: 'atelier' | 'article') => Article[];
  getPublishedArticles: () => Article[];
}

// Articles initiaux
const initialArticles: Article[] = [
  {
    id: '1',
    slug: 'atelier-macarons-famille-dupont',
    title: 'Atelier Macarons chez la famille Dupont',
    excerpt: 'Un après-midi gourmand en famille pour apprendre les secrets des macarons parisiens.',
    content: `## Une journée inoubliable

Ce samedi, j'ai eu le plaisir d'animer un atelier macarons chez la famille Dupont à Lyon.
Parents et enfants ont mis la main à la pâte pour réaliser de délicieux macarons à la framboise et au chocolat.

### Le programme de l'atelier

- Préparation de la meringue française
- Réalisation du tant pour tant
- Macaronage et pochage
- Préparation des ganaches

### Les créations du jour

Chacun est reparti avec une boîte de 12 macarons faits maison et surtout, de beaux souvenirs en famille !`,
    image: '/images/atelier-macarons.jpg',
    category: 'atelier',
    date: '2026-01-15',
    location: 'Lyon 6ème',
    published: true,
  },
  {
    id: '2',
    slug: 'secrets-pate-feuilletee',
    title: "Les secrets d'une pâte feuilletée réussie",
    excerpt: 'Découvrez mes astuces pour réaliser une pâte feuilletée légère et croustillante à la maison.',
    content: `## La pâte feuilletée : un art accessible

Beaucoup pensent que la pâte feuilletée est réservée aux professionnels. Je vous prouve le contraire !

### Les ingrédients clés

- Une farine de qualité (T45 ou T55)
- Du beurre de tourage bien froid
- De l'eau glacée
- Une pincée de sel

### Les étapes essentielles

1. **La détrempe** : Mélangez farine, sel et eau pour obtenir une pâte homogène
2. **Le beurrage** : Enfermez le beurre dans la détrempe
3. **Les tours** : Réalisez 6 tours simples en laissant reposer entre chaque

### Mon conseil

Travaillez toujours dans une cuisine fraîche et ne sautez jamais les temps de repos au réfrigérateur !`,
    image: '/images/pate-feuilletee.jpg',
    category: 'article',
    date: '2026-01-10',
    published: true,
  },
  {
    id: '3',
    slug: 'atelier-anniversaire-emma',
    title: "Atelier Cupcakes pour l'anniversaire d'Emma",
    excerpt: 'Une fête d\'anniversaire sucrée où les enfants ont décoré leurs propres cupcakes.',
    content: `## Un anniversaire pas comme les autres

Pour ses 8 ans, Emma a souhaité un anniversaire pâtisserie. Ses amis et elle ont passé un moment magique !

### Au programme

- Décoration de cupcakes à la vanille
- Atelier glaçage royal
- Création de cake toppers personnalisés

### Le résultat

10 enfants ravis, des cupcakes colorés et des parents impressionnés par les créations de leurs petits chefs !`,
    image: '/images/atelier-cupcakes.jpg',
    category: 'atelier',
    date: '2026-01-08',
    location: 'Villeurbanne',
    published: true,
  },
];

export const useArticlesStore = create<ArticlesState>()(
  persist(
    (set, get) => ({
      articles: initialArticles,

      addArticle: (article) =>
        set((state) => ({
          articles: [
            ...state.articles,
            { ...article, id: Date.now().toString() },
          ],
        })),

      updateArticle: (id, data) =>
        set((state) => ({
          articles: state.articles.map((article) =>
            article.id === id ? { ...article, ...data } : article
          ),
        })),

      deleteArticle: (id) =>
        set((state) => ({
          articles: state.articles.filter((article) => article.id !== id),
        })),

      getArticleBySlug: (slug) => get().articles.find((a) => a.slug === slug),

      getArticlesByCategory: (category) =>
        get().articles.filter((a) => a.category === category && a.published),

      getPublishedArticles: () => get().articles.filter((a) => a.published),
    }),
    {
      name: 'articles-storage',
    }
  )
);
