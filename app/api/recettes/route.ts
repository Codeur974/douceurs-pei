import { NextResponse } from 'next/server';
import { RecettesService } from '@/lib/services';
import { Difficulte } from '@prisma/client';

const difficulteMap: Record<string, Difficulte> = {
  'Facile': 'FACILE',
  'Intermédiaire': 'INTERMEDIAIRE',
  'Avancé': 'AVANCE',
  'FACILE': 'FACILE',
  'INTERMEDIAIRE': 'INTERMEDIAIRE',
  'AVANCE': 'AVANCE',
};

export async function GET() {
  try {
    const recettes = await RecettesService.getAll();
    return NextResponse.json(recettes);
  } catch (error) {
    console.error('Erreur GET recettes:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const recette = await RecettesService.create({
      titre: data.titre,
      description: data.description,
      image: data.image,
      difficulte: difficulteMap[data.difficulte] || 'FACILE',
      temps: data.temps,
      ingredients: data.ingredients,
      etapes: data.etapes,
    });

    return NextResponse.json(recette);
  } catch (error) {
    console.error('Erreur POST recette:', error);
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, difficulte, ...rest } = await request.json();

    const data: Record<string, unknown> = { ...rest };
    if (difficulte) data.difficulte = difficulteMap[difficulte] || difficulte;

    const recette = await RecettesService.update(id, data as Parameters<typeof RecettesService.update>[1]);
    return NextResponse.json(recette);
  } catch (error) {
    console.error('Erreur PUT recette:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await RecettesService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE recette:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
