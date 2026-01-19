import { NextResponse } from 'next/server';
import { ArticlesService } from '@/lib/services';
import { CategorieArticle } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');

    const options: { published?: boolean; category?: CategorieArticle } = {};

    if (published === 'true') options.published = true;
    if (category && category !== 'tous') {
      options.category = category.toUpperCase() as CategorieArticle;
    }

    const articles = await ArticlesService.getAll(options);
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Erreur GET articles:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const article = await ArticlesService.create({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image || '',
      category: (data.category?.toUpperCase() || 'ARTICLE') as CategorieArticle,
      date: new Date(data.date || Date.now()),
      location: data.location || undefined,
      published: data.published || false,
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error('Erreur POST article:', error);
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, category, date, ...rest } = await request.json();

    const data: Record<string, unknown> = { ...rest };
    if (category) data.category = category.toUpperCase() as CategorieArticle;
    if (date) data.date = new Date(date);

    const article = await ArticlesService.update(id, data as Parameters<typeof ArticlesService.update>[1]);
    return NextResponse.json(article);
  } catch (error) {
    console.error('Erreur PUT article:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await ArticlesService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE article:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
