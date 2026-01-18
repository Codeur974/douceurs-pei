'use client';

import { useRouter } from 'next/navigation';

export function ClientLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      await fetch('/api/client/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-500 hover:text-red-500 text-sm transition"
    >
      Déconnexion
    </button>
  );
}
