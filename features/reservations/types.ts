export interface Reservation {
  id: string;
  clientNom: string;
  clientEmail: string;
  clientTelephone: string;
  typePrestation: 'pack-decouverte' | 'pack-premium' | 'atelier' | 'sur-mesure';
  date: Date;
  details?: string;
  statut: 'en-attente' | 'confirmee' | 'annulee' | 'terminee';
  montant?: number;
  createdAt: Date;
}
