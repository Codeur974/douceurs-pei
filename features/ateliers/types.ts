export interface Atelier {
  id: string;
  nom: string;
  slug: string;
  description: string;
  duree: number; // en heures
  tarif: number;
  placesMax: number;
  imageUrl?: string;
  niveau: 'debutant' | 'intermediaire' | 'avance';
}

export interface SessionAtelier {
  id: string;
  atelierId: string;
  date: Date;
  placesRestantes: number;
  statut: 'planifie' | 'complet' | 'annule';
}
