import { NextResponse } from 'next/server';
import { ClientsService } from '@/lib/services';

export async function GET() {
  try {
    const clients = await ClientsService.getAll();
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Erreur GET clients:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await ClientsService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE client:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
