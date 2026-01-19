import { NextResponse } from 'next/server';
import { AvisService } from '@/lib/services';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const valide = searchParams.get('valide');

    let valideFilter: boolean | undefined;
    if (valide === 'true') valideFilter = true;
    else if (valide === 'false') valideFilter = false;

    const avis = await AvisService.getAll(valideFilter);
    return NextResponse.json(avis);
  } catch (error) {
    console.error('Erreur GET avis:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const avis = await AvisService.create({
      clientNom: data.clientNom,
      note: data.note,
      commentaire: data.commentaire,
      clientId: data.clientId || undefined,
      reservationId: data.reservationId || undefined,
    });

    return NextResponse.json(avis);
  } catch (error) {
    console.error('Erreur POST avis:', error);
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    const avis = await AvisService.update(id, data);
    return NextResponse.json(avis);
  } catch (error) {
    console.error('Erreur PUT avis:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await AvisService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE avis:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
