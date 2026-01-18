'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Nav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/blog', label: 'Blog' },
    { href: '/tarifs', label: 'Tarifs' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="py-4">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-4 md:gap-8">
        {links.map((link) => {
          const isActive = pathname === link.href ||
            (link.href !== '/' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                isActive
                  ? 'text-primary font-medium'
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
