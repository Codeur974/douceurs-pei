import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Pâtisserie à Domicile</h3>
            <p className="text-gray-200">
              Des ateliers gourmands directement chez vous
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="hover:underline">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-200">
              <li>Email: eric.sermande@gmail.com</li>
              <li>Tél: 0693111897</li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Formulaire de contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-400 pt-6 text-center text-gray-200">
          <p>&copy; 2026 Pâtisserie à Domicile - Tous droits réservés</p>
          <Link href="/mentions-legales" className="hover:underline text-sm">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
