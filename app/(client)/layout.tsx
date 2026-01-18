import { ReactNode } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { ClientLogoutButton } from '@/components/client/ClientLogoutButton';
import { Footer } from '@/components/layout/Footer';
import { Logo } from '@/components/layout/Logo';

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('client-token');

  // Si pas connecté, afficher uniquement le contenu (page de login)
  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-linear-to-br from-primary/20 via-secondary/10 to-primary/20">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Logo />
                <Link href="/client" className="text-2xl font-bold text-primary font-(family-name:--font-alex-brush)">
                  Mon Espace
                </Link>
              </div>
              <nav className="flex items-center gap-6">
                <Link href="/client" className="text-gray-700 hover:text-primary transition">
                  Tableau de bord
                </Link>
                <Link href="/client/recettes" className="text-gray-700 hover:text-primary transition">
                  Mes Recettes
                </Link>
                <Link href="/client/mes-ateliers" className="text-gray-700 hover:text-primary transition">
                  Mes Ateliers
                </Link>
                <ClientLogoutButton />
              </nav>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
