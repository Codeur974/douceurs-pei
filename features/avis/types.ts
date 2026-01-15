export interface Avis {
  id: string;
  clientNom: string;
  note: 1 | 2 | 3 | 4 | 5;
  commentaire: string;
  reservationId?: string;
  valide: boolean;
  createdAt: Date;
}
