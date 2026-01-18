import { Nav } from "@/components/layout/Nav";

export default function Tarifs() {
  return (
    <section
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/paribrest.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="relative z-10">
        <Nav />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4 text-center text-primary font-(family-name:--font-alex-brush)">
            Mes Tarifs
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Des formules adaptées à vos envies et votre budget
          </p>

          {/* Container pour les deux cartes */}
          <div className="max-w-3xl mx-auto relative">
            {/* Carte Cadeau en haut à gauche */}
            <div className="absolute -top-8 -left-4 md:-left-16 z-20 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="w-64 bg-linear-to-br from-primary to-secondary rounded-xl shadow-2xl p-5 text-center relative overflow-hidden">
                {/* Motif décoratif */}
                <div className="absolute top-2 left-2 text-3xl">🎀</div>
                <div className="absolute bottom-2 right-2 text-2xl opacity-40">🎂</div>

                <div className="relative z-10">
                  <h3 className="text-2xl text-white mb-1 font-(family-name:--font-alex-brush)">
                    Carte Cadeau
                  </h3>
                  <div className="w-10 h-0.5 bg-white/50 mx-auto mb-2 rounded"></div>
                  <p className="text-white/90 text-xs mb-2">
                    Offrez un moment gourmand !
                  </p>
                  <p className="text-lg font-bold text-white">
                    Choisissez votre atelier
                  </p>
                  <p className="text-white/70 text-[10px] mt-1">
                    Valable 1 an
                  </p>
                </div>
              </div>
            </div>

            {/* Style menu restaurant */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-12 border border-primary/20 mt-12 md:mt-0">
            {/* Ligne décorative */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent w-full"></div>
              <span className="px-4 text-primary text-2xl">✦</span>
              <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent w-full"></div>
            </div>

            <p className="text-center text-gray-500 italic mb-8">
              Tous les tarifs sont par personne
            </p>

            {/* Tarif 1 */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between border-b border-dotted border-gray-400 pb-2">
                <div>
                  <span className="text-4xl text-stone-800 inline font-(family-name:--font-alex-brush)">
                    Atelier Individuel
                  </span>
                  <span className="text-gray-500 ml-2">· 3 heures</span>
                </div>
                <span className="text-3xl font-bold text-primary">60€</span>
              </div>
              <p className="text-gray-600 mt-2 italic">
                Cours particulier à votre rythme, recettes au choix
              </p>
            </div>

            {/* Tarif 2 - Populaire */}
            <div className="mb-8 bg-primary/5 -mx-8 md:-mx-12 px-8 md:px-12 py-6 border-y border-primary/20">
              <div className="flex items-baseline justify-between border-b border-dotted border-primary/40 pb-2">
                <div>
                  <span className="bg-primary text-white text-xs font-bold py-1 px-2 rounded mr-2">
                    POPULAIRE
                  </span>
                  <span className="text-4xl text-stone-800 inline font-(family-name:--font-alex-brush)">
                    Atelier Duo/Groupe
                  </span>
                  <span className="text-gray-500 ml-2">
                    · à partir de 2 personnes
                  </span>
                </div>
                <span className="text-3xl font-bold text-primary">50€</span>
              </div>
              <p className="text-gray-600 mt-2 italic">
                En famille ou entre amis, moment de partage convivial
              </p>
            </div>

            {/* Tarif 3 */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between border-b border-dotted border-gray-400 pb-2">
                <div>
                  <span className="text-4xl text-stone-800 inline font-(family-name:--font-alex-brush)">
                    Atelier Journée
                  </span>
                  <span className="text-gray-500 ml-2">· grandes recettes</span>
                </div>
                <span className="text-3xl font-bold text-primary">
                  100€<span className="text-lg">/jour</span>
                </span>
              </div>
              <p className="text-gray-600 mt-2 italic">
                Gâteaux complexes, techniques avancées
              </p>
            </div>

            {/* Tarif 4 - Économique */}
            <div className="mb-8 bg-secondary/5 -mx-8 md:-mx-12 px-8 md:px-12 py-6 border-y border-secondary/20">
              <div className="flex items-baseline justify-between border-b border-dotted border-secondary/40 pb-2">
                <div>
                  <span className="bg-secondary text-white text-xs font-bold py-1 px-2 rounded mr-2">
                    ÉCONOMIQUE
                  </span>
                  <span className="text-4xl text-stone-800 inline font-(family-name:--font-alex-brush)">
                    Forfait Multi-cours
                  </span>
                  <span className="text-gray-500 ml-2">· 3 cours minimum</span>
                </div>
                <span className="text-3xl font-bold text-secondary">
                  45€<span className="text-lg">/cours</span>
                </span>
              </div>
              <p className="text-gray-600 mt-2 italic">
                Idéal pour apprendre toutes les bases, progression garantie,
                suivi personnalisé
              </p>
            </div>

            {/* Ligne décorative */}
            <div className="flex items-center justify-center mt-10">
              <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent w-full"></div>
              <span className="px-4 text-primary text-2xl">✦</span>
              <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent w-full"></div>
            </div>

            {/* Note */}
            <p className="text-center text-gray-500 text-sm mt-8">
              Tous les ateliers incluent les fiches recettes et mes conseils personnalisés
            </p>
            <p className="text-center text-gray-500 text-sm mt-2">
              Si je fournis les ingrédients : supplément de 10 à 15€
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
