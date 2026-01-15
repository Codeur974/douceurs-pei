import { ReactNode } from 'react';

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Pâtisserie à Domicile</h1>
            <div className="flex gap-6">
              <a href="/" className="hover:text-primary">Accueil</a>
              <a href="/prestations" className="hover:text-primary">Prestations</a>
              <a href="/ateliers" className="hover:text-primary">Ateliers</a>
              <a href="/tarifs" className="hover:text-primary">Tarifs</a>
              <a href="/galerie" className="hover:text-primary">Galerie</a>
              <a href="/contact" className="hover:text-primary">Contact</a>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="bg-secondary text-white mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">&copy; 2026 Pâtisserie à Domicile - Tous droits réservés</p>
        </div>
      </footer>
    </>
  );
}
