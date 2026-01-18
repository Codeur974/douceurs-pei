import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'galerie.json');

interface GalerieImage {
  id: string;
  src: string;
  title: string;
}

async function getImages(): Promise<GalerieImage[]> {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveImages(images: GalerieImage[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(images, null, 2));
}

// GET - Récupérer toutes les images
export async function GET() {
  const images = await getImages();
  return NextResponse.json(images);
}

// POST - Ajouter une image
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    if (!file || !title) {
      return NextResponse.json({ error: 'Fichier et titre requis' }, { status: 400 });
    }

    // Générer un nom de fichier unique
    const extension = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const filePath = path.join(process.cwd(), 'public', 'images', fileName);

    // Sauvegarder le fichier
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Ajouter à la galerie
    const images = await getImages();
    const newImage: GalerieImage = {
      id: Date.now().toString(),
      src: `/images/${fileName}`,
      title,
    };
    images.push(newImage);
    await saveImages(images);

    return NextResponse.json(newImage);
  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}

// DELETE - Supprimer une image
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const images = await getImages();
    const imageIndex = images.findIndex((img) => img.id === id);

    if (imageIndex === -1) {
      return NextResponse.json({ error: 'Image non trouvée' }, { status: 404 });
    }

    const image = images[imageIndex];

    // Supprimer le fichier (seulement si c'est dans /images/)
    if (image.src.startsWith('/images/')) {
      const filePath = path.join(process.cwd(), 'public', image.src);
      try {
        await fs.unlink(filePath);
      } catch {
        // Fichier peut-être déjà supprimé
      }
    }

    // Retirer de la liste
    images.splice(imageIndex, 1);
    await saveImages(images);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}

// PUT - Modifier le titre d'une image
export async function PUT(request: Request) {
  try {
    const { id, title } = await request.json();

    const images = await getImages();
    const image = images.find((img) => img.id === id);

    if (!image) {
      return NextResponse.json({ error: 'Image non trouvée' }, { status: 404 });
    }

    image.title = title;
    await saveImages(images);

    return NextResponse.json(image);
  } catch (error) {
    console.error('Erreur modification:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}
