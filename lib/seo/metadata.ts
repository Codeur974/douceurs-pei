import { Metadata } from 'next';

const SITE_NAME = 'Pâtisserie à Domicile';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SITE_DESCRIPTION = 'Créations pâtissières gourmandes livrées à domicile. Ateliers, gâteaux sur mesure et buffets sucrés.';

export function generateMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '',
  image = '/images/og-default.jpg',
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image }],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
