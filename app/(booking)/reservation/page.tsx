'use client';

import { useState } from 'react';
import { useReservationStore } from '@/lib/stores';
import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';

const prestations = [
  {
    value: 'atelier-individuel',
    title: 'Atelier Individuel',
    price: '60€',
    duration: '3 heures',
    description: 'Cours particulier à votre rythme',
    icon: '👤',
  },
  {
    value: 'atelier-duo-groupe',
    title: 'Atelier Duo/Groupe',
    price: '50€/pers',
    duration: 'À partir de 2 personnes',
    description: 'En famille ou entre amis',
    icon: '👥',
    popular: true,
  },
  {
    value: 'atelier-journee',
    title: 'Atelier Journée',
    price: '100€/jour',
    duration: 'Journée complète',
    description: 'Gâteaux complexes, techniques avancées',
    icon: '🎂',
  },
  {
    value: 'forfait-multi-cours',
    title: 'Forfait Multi-cours',
    price: '45€/cours',
    duration: '3 cours minimum',
    description: 'Progression garantie',
    icon: '📚',
  },
];

interface Credentials {
  email: string;
  password: string;
}

interface ReservationResult {
  success: boolean;
  isNewClient: boolean;
  credentials: Credentials | null;
  reservation: {
    id: string;
    prestation: string;
    date: string;
  };
}

export default function Reservation() {
  const { data, setField, reset } = useReservationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ReservationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (res.ok) {
        setResult(responseData);
        reset();
      } else {
        setError(responseData.error || 'Une erreur est survenue');
      }
    } catch {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  // Affichage après réservation réussie
  if (result) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/10 via-secondary/5 to-primary/10 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🎉</span>
              </div>
              <h1 className="text-3xl font-bold text-primary mb-4 font-(family-name:--font-alex-brush)">
                Réservation envoyée !
              </h1>
              <p className="text-gray-600 mb-8">
                Votre demande a bien été enregistrée. Je vous contacterai rapidement pour confirmer.
              </p>

              <div className="bg-stone-50 rounded-2xl p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📋</span> Récapitulatif
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Prestation :</span>{' '}
                    {prestations.find(p => p.value === result.reservation.prestation)?.title}
                  </p>
                  <p>
                    <span className="font-medium">Date souhaitée :</span>{' '}
                    {new Date(result.reservation.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {result.isNewClient && result.credentials && (
                <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-6 mb-6 text-left">
                  <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔐</span>
                    Votre espace client a été créé !
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Conservez ces identifiants pour accéder à vos recettes :
                  </p>
                  <div className="bg-white rounded-xl p-4 space-y-3 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Email :</span>
                      <span className="font-bold font-mono">{result.credentials.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Mot de passe :</span>
                      <span className="font-bold font-mono bg-primary/10 px-3 py-1 rounded">{result.credentials.password}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    ⚠️ Notez ces informations, le mot de passe ne sera plus affiché.
                  </p>
                </div>
              )}

              {!result.isNewClient && (
                <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 mb-6">
                  <p className="text-gray-700 flex items-center justify-center gap-2">
                    <span className="text-2xl">👋</span>
                    Connectez-vous avec vos identifiants habituels.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/client/login"
                  className="bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary/90 transition font-semibold shadow-lg"
                >
                  Accéder à mon espace
                </Link>
                <Link
                  href="/"
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-200 transition font-medium"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/10 via-secondary/5 to-primary/10">
      {/* Header */}
      <header className="pt-6">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Logo />
          <Link href="/" className="text-gray-600 hover:text-primary transition text-sm">
            ← Retour à l'accueil
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Titre */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-(family-name:--font-alex-brush) mb-4">
              Réservez votre atelier
            </h1>
            <p className="text-gray-600 text-lg">
              Choisissez votre formule et réservez votre moment gourmand
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Étape 1 : Choix de la prestation */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">1</span>
                Choisissez votre formule
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {prestations.map((prestation) => (
                  <label
                    key={prestation.value}
                    className={`relative block p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      data.prestation === prestation.value
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow'
                    }`}
                  >
                    <input
                      type="radio"
                      name="prestation"
                      value={prestation.value}
                      checked={data.prestation === prestation.value}
                      onChange={(e) => setField('prestation', e.target.value)}
                      className="sr-only"
                      required
                    />
                    {prestation.popular && (
                      <span className="absolute -top-3 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAIRE
                      </span>
                    )}
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{prestation.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{prestation.title}</h3>
                        <p className="text-sm text-gray-500">{prestation.duration}</p>
                        <p className="text-sm text-gray-600 mt-1">{prestation.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary">{prestation.price}</span>
                      </div>
                    </div>
                    {data.prestation === prestation.value && (
                      <div className="absolute top-4 left-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Étape 2 : Date */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">2</span>
                Choisissez une date
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <input
                  type="date"
                  value={data.date}
                  onChange={(e) => setField('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition text-lg"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Je vous confirmerai la disponibilité par email ou téléphone.
                </p>
              </div>
            </div>

            {/* Étape 3 : Coordonnées */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">3</span>
                Vos coordonnées
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.nom}
                      onChange={(e) => setField('nom', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition"
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={data.telephone}
                      onChange={(e) => setField('telephone', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition"
                      placeholder="0692 XX XX XX"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setField('email', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition"
                    placeholder="votre@email.com"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Un compte client sera créé avec cet email pour accéder à vos recettes.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Détails de votre demande
                  </label>
                  <textarea
                    rows={4}
                    value={data.details}
                    onChange={(e) => setField('details', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition resize-none"
                    placeholder="Recettes souhaitées, nombre de participants, allergies alimentaires..."
                  />
                </div>
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
                {error}
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-5 px-8 rounded-2xl hover:bg-primary/90 disabled:opacity-50 font-bold text-xl transition shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                'Confirmer ma réservation'
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              En confirmant, vous acceptez d'être contacté pour finaliser votre réservation.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
