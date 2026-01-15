import { Atelier } from './types';

// Simuler une base de données
const mockAteliers: Atelier[] = [
  {
    id: '1',
    nom: 'Atelier Macarons',
    slug: 'macarons',
    description: 'Apprenez à réaliser des macarons parfaits',
    duree: 3,
    tarif: 75,
    placesMax: 6,
    niveau: 'intermediaire',
  },
  {
    id: '2',
    nom: 'Atelier Tartes',
    slug: 'tartes',
    description: 'Maîtrisez l\'art de la tarte française',
    duree: 3,
    tarif: 70,
    placesMax: 6,
    niveau: 'debutant',
  },
];

export async function getAteliers(): Promise<Atelier[]> {
  return mockAteliers;
}

export async function getAtelierBySlug(slug: string): Promise<Atelier | null> {
  return mockAteliers.find(a => a.slug === slug) || null;
}

export async function getAtelierById(id: string): Promise<Atelier | null> {
  return mockAteliers.find(a => a.id === id) || null;
}
