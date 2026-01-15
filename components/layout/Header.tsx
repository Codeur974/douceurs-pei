import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Pâtisserie à Domicile
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-primary transition">
              Accueil
            </Link>
            <Link href="/prestations" className="hover:text-primary transition">
              Prestations
            </Link>
            <Link href="/ateliers" className="hover:text-primary transition">
              Ateliers
            </Link>
            <Link href="/tarifs" className="hover:text-primary transition">
              Tarifs
            </Link>
            <Link href="/galerie" className="hover:text-primary transition">
              Galerie
            </Link>
            <Link href="/contact" className="hover:text-primary transition">
              Contact
            </Link>
          </div>
          <Link
            href="/reservation"
            className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Réserver
          </Link>
        </div>
      </nav>
    </header>
  );
}
