'use client';

import { useState } from 'react';
import { Nav } from '@/components/layout/Nav';
import Link from 'next/link';

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', sujet: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSuccess(true);
    setForm({ nom: '', email: '', telephone: '', sujet: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-linear-to-br from-primary/20 via-secondary/10 to-primary/20">
        <Nav />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-5xl font-bold text-primary font-(family-name:--font-alex-brush) mb-4">
            Contactez-moi
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Une question, une envie de pâtisser ? N&apos;hésitez pas à me contacter !
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Infos de contact */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Restons en contact</h2>

            <div className="space-y-6">
              {/* Téléphone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Téléphone</h3>
                  <p className="text-gray-600">0693 11 18 97</p>
                  <p className="text-sm text-gray-500">Du lundi au samedi, 9h - 18h</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a href="mailto:eric.sermande@gmail.com" className="text-primary hover:underline">
                    eric.sermande@gmail.com
                  </a>
                  <p className="text-sm text-gray-500">Réponse sous 24h</p>
                </div>
              </div>

              {/* Localisation */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Zone d&apos;intervention</h3>
                  <p className="text-gray-600">La Réunion</p>
                  <p className="text-sm text-gray-500">Je me déplace chez vous !</p>
                </div>
              </div>
            </div>

            {/* Réservation rapide */}
            <div className="mt-10 p-6 bg-linear-to-br from-primary to-secondary rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-2">Prêt à pâtisser ?</h3>
              <p className="text-white/90 mb-4">
                Réservez directement votre atelier en ligne et recevez vos identifiants pour accéder à votre espace client.
              </p>
              <Link
                href="/reservation"
                className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Réserver un atelier
              </Link>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-moi un message</h2>

            {success ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✉️</div>
                <h3 className="text-xl font-bold text-primary mb-2">Message envoyé !</h3>
                <p className="text-gray-600 mb-6">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-primary hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={form.telephone}
                      onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.sujet}
                    onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="renseignement">Renseignement sur les ateliers</option>
                    <option value="devis">Demande de devis</option>
                    <option value="carte-cadeau">Carte cadeau</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                    placeholder="Décrivez votre demande..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary/90 disabled:opacity-50 font-semibold text-lg transition"
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour vous recontacter.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
