'use server';

import { reservationSchema } from './schema';

export async function createReservation(data: unknown) {
  try {
    const validated = reservationSchema.parse(data);
    
    // TODO: Sauvegarder dans la base de données
    console.log('Création réservation:', validated);
    
    // TODO: Envoyer email de confirmation
    
    return { success: true, data: validated };
  } catch (error) {
    return { success: false, error: 'Erreur lors de la création de la réservation' };
  }
}

export async function updateReservationStatut(id: string, statut: string) {
  try {
    // TODO: Mettre à jour dans la base de données
    console.log('Mise à jour statut réservation:', id, statut);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erreur lors de la mise à jour du statut' };
  }
}
