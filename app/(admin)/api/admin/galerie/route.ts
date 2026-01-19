import { NextResponse } from 'next/server';
import { GalerieService } from '@/lib/services';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const images = await GalerieService.getAll();
    return NextResponse.json(images);
  } catch (error) {
    console.error('Erreur GET galerie:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    if (!file || !title) {
      return NextResponse.json({ error: 'Fichier et titre requis' }, { status: 400 });
    }

    const extension = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const filePath = path.join(process.cwd(), 'public', 'images', fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const newImage = await GalerieService.create({
      src: `/images/${fileName}`,
      title,
    });

    return NextResponse.json(newImage);
  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const image = await GalerieService.getById(id);
    if (!image) {
      return NextResponse.json({ error: 'Image non trouvée' }, { status: 404 });
    }

    if (image.src.startsWith('/images/')) {
      const filePath = path.join(process.cwd(), 'public', image.src);
      try {
        await fs.unlink(filePath);
      } catch {
        // Fichier peut-être déjà supprimé
      }
    }

    await GalerieService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title } = await request.json();
    const image = await GalerieService.updateTitle(id, title);
    return NextResponse.json(image);
  } catch (error) {
    console.error('Erreur modification:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}
