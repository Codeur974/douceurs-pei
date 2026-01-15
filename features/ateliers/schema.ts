import { z } from 'zod';

export const atelierSchema = z.object({
  nom: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  slug: z.string().min(3),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  duree: z.number().min(1).max(8),
  tarif: z.number().min(0),
  placesMax: z.number().min(1).max(20),
  imageUrl: z.string().url().optional(),
  niveau: z.enum(['debutant', 'intermediaire', 'avance']),
});

export type AtelierInput = z.infer<typeof atelierSchema>;
