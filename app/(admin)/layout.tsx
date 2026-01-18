import { ReactNode } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LogoutButton, BackToHomeButton } from '@/components/admin/LogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('admin-token');

  // Si pas connecté, afficher uniquement le contenu (page de login)
  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Administration</h1>
            <nav className="flex items-center gap-4">
              <Link href="/admin" className="hover:underline">Dashboard</Link>
              <Link href="/admin/blog" className="hover:underline">Blog</Link>
              <Link href="/admin/galerie" className="hover:underline">Galerie</Link>
              <Link href="/admin/reservations" className="hover:underline">Réservations</Link>
              <Link href="/admin/disponibilites" className="hover:underline">Disponibilités</Link>
              <span className="text-white/30">|</span>
              <LogoutButton />
              <BackToHomeButton />
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
