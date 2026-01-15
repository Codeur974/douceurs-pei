import { ReactNode } from 'react';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Administration</h1>
            <nav className="flex gap-4">
              <a href="/admin" className="hover:underline">Dashboard</a>
              <a href="/admin/ateliers" className="hover:underline">Ateliers</a>
              <a href="/admin/reservations" className="hover:underline">Réservations</a>
              <a href="/admin/disponibilites" className="hover:underline">Disponibilités</a>
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
