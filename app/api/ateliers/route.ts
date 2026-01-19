import { NextResponse } from 'next/server';
import { AteliersService } from '@/lib/services';
import { NiveauAtelier } from '@prisma/client';

const niveauMap: Record<string, NiveauAtelier> = {
  'debutant': 'DEBUTANT',
  'intermediaire': 'INTERMEDIAIRE',
  'avance': 'AVANCE',
  'DEBUTANT': 'DEBUTANT',
  'INTERMEDIAIRE': 'INTERMEDIAIRE',
  'AVANCE': 'AVANCE',
};

export async function GET() {
  try {
    const ateliers = await AteliersService.getAll();
    return NextResponse.json(ateliers);
  } catch (error) {
    console.error('Erreur GET ateliers:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const atelier = await AteliersService.create({
      nom: data.nom,
      slug: data.slug,
      description: data.description,
      duree: data.duree,
      tarif: data.tarif,
      placesMax: data.placesMax,
      imageUrl: data.imageUrl || undefined,
      niveau: niveauMap[data.niveau] || 'DEBUTANT',
    });

    return NextResponse.json(atelier);
  } catch (error) {
    console.error('Erreur POST atelier:', error);
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, niveau, ...rest } = await request.json();

    const data: Record<string, unknown> = { ...rest };
    if (niveau) data.niveau = niveauMap[niveau] || niveau;

    const atelier = await AteliersService.update(id, data as Parameters<typeof AteliersService.update>[1]);
    return NextResponse.json(atelier);
  } catch (error) {
    console.error('Erreur PUT atelier:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await AteliersService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE atelier:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
