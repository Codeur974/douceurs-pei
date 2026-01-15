'use server';

import { atelierSchema } from './schema';

export async function createAtelier(data: unknown) {
  try {
    const validated = atelierSchema.parse(data);
    
    // TODO: Sauvegarder dans la base de données
    console.log('Création atelier:', validated);
    
    return { success: true, data: validated };
  } catch (error) {
    return { success: false, error: 'Erreur lors de la création de l\'atelier' };
  }
}

export async function updateAtelier(id: string, data: unknown) {
  try {
    const validated = atelierSchema.parse(data);
    
    // TODO: Mettre à jour dans la base de données
    console.log('Mise à jour atelier:', id, validated);
    
    return { success: true, data: validated };
  } catch (error) {
    return { success: false, error: 'Erreur lors de la mise à jour de l\'atelier' };
  }
}

export async function deleteAtelier(id: string) {
  try {
    // TODO: Supprimer de la base de données
    console.log('Suppression atelier:', id);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erreur lors de la suppression de l\'atelier' };
  }
}
