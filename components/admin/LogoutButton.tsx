'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white/70 hover:text-white text-sm"
    >
      Déconnexion
    </button>
  );
}

export function BackToHomeButton() {
  const router = useRouter();

  const handleBackToHome = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <button
      onClick={handleBackToHome}
      className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
    >
      Retour à l'accueil
    </button>
  );
}
