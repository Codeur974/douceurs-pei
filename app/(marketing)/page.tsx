import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section
        className="relative bg-cover min-h-[70vh] flex flex-col"
        style={{
          backgroundImage: "url('/images/mariage.jpg')",
          backgroundPosition: "center 70%",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <nav className="relative z-10 container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <Link href="/" className="text-white hover:text-secondary transition">Accueil</Link>
            <Link href="/blog" className="text-white hover:text-secondary transition">Blog</Link>
            <Link href="/tarifs" className="text-white hover:text-secondary transition">Tarifs</Link>
            <Link href="/galerie" className="text-white hover:text-secondary transition">Galerie</Link>
            <Link href="/contact" className="text-white hover:text-secondary transition">Contact</Link>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">
              Le savoir-faire d&apos;un pâtissier à portée de main
            </h1>
            <Link
              href="/reservation"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg text-lg font-semibold inline-block transition shadow-lg"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary/10 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-6 mb-4">
              <Image
                src="/images/IMG_pate feuilleter.jpg"
                alt="Pâte feuilletée"
                width={112}
                height={112}
                className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full shadow-md hidden sm:block"
              />
              <h2 className="text-2xl md:text-3xl font-semibold text-stone-800">
                Ateliers de pâtisserie à domicile
              </h2>
              <Image
                src="/images/lego.jpg"
                alt="Gâteau Lego"
                width={112}
                height={112}
                className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full shadow-md hidden sm:block"
              />
            </div>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
              Des créations gourmandes avec votre matériel du quotidien — sans
              stress, et à votre rythme.
            </p>

            <p className="text-lg md:text-xl text-stone-600 mt-6">
              Mon CAP Pâtissier et mes 20 ans d&apos;expérience m&apos;ont permis
              d&apos;acquérir des méthodes variées que j&apos;adapte à vos besoins.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-stone-100 transition shadow-[0_4px_20px_rgba(141,182,0,0.3)] hover:shadow-[0_8px_30px_rgba(141,182,0,0.4)]">
              <p className="text-lg font-semibold italic text-secondary mb-2">
                Chez vous, tout simplement
              </p>
              <p className="text-stone-600">
                On pâtisse avec votre matériel et vos habitudes : pas besoin
                d&apos;équipement professionnel.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-stone-100 transition shadow-[0_4px_20px_rgba(141,182,0,0.3)] hover:shadow-[0_8px_30px_rgba(141,182,0,0.4)]">
              <p className="text-lg font-semibold italic text-secondary mb-2">
                Un atelier 100% adapté
              </p>
              <p className="text-stone-600">
                Niveau débutant ou confirmé : bases (pâtes, crèmes, cuissons),
                bons gestes et astuces de pro.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-stone-100 transition shadow-[0_4px_20px_rgba(141,182,0,0.3)] hover:shadow-[0_8px_30px_rgba(141,182,0,0.4)]">
              <p className="text-lg font-semibold italic text-secondary mb-2">
                Pour refaire facilement après
              </p>
              <p className="text-stone-600">
                Vous gardez une fiche recette claire + un pas-à-pas détaillé
                pour reproduire et varier les recettes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-16 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/patate.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">
            Déroulement d&apos;un atelier
          </h2>

        <div className="space-y-8">
          {/* Avant l'atelier */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Avant l&apos;atelier
            </h3>
            <ul className="text-gray-700 space-y-2 ml-4">
              <li>
                • Nous choisissons les recettes ensemble (1 à 3 selon
                durée/niveau)
              </li>
              <li>• Vous recevez les listes d&apos;ingrédients et de matériel</li>
              <li>• Fourniture des ingrédients possible (avec supplément)</li>
            </ul>
          </div>

          {/* Le jour de l'atelier */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-secondary">
            <h3 className="text-2xl font-bold mb-6 text-secondary">
              Le jour de l&apos;atelier
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Installation et accueil (10-15 min)
                </h4>
                <ul className="text-gray-700 space-y-2 ml-4">
                  <li>• Accueil et présentation rapide</li>
                  <li>• Vérification du matériel et des ingrédients</li>
                  <li>• Mise en place et organisation de l&apos;espace</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  L&apos;atelier pratique (le cœur)
                </h4>
                <ul className="text-gray-700 space-y-2 ml-4">
                  <li>
                    • Démonstration puis pratique : je montre un geste, vous
                    reproduisez
                  </li>
                  <li>
                    • Je vous guide pas à pas (techniques, astuces, erreurs
                    fréquentes)
                  </li>
                  <li>• Adaptation à votre rythme et à votre niveau</li>
                  <li>• Gestion du timing (cuissons, repos, dressage)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Fin d&apos;atelier (10-15 min)
                </h4>
                <ul className="text-gray-700 space-y-2 ml-4">
                  <li>• Rangement rapide ensemble</li>
                  <li>• Photo de vos réalisations (option)</li>
                  <li>• Conseils pour le service et le dressage</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ce que vous conservez */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Ce que vous conservez
            </h3>
            <ul className="text-gray-700 space-y-2 ml-4">
              <li>• Fiches recettes claires et procédé étape par étape</li>
              <li>
                • Mes astuces (conservation, variantes, matériel conseillé)
              </li>
              <li>• Vos créations et la satisfaction d&apos;avoir appris</li>
            </ul>
          </div>
        </div>
        </div>
      </section>

      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-xl md:text-2xl text-stone-700 leading-relaxed">
            Bien plus qu&apos;un cours, chaque atelier est un moment de <span className="font-semibold text-secondary">transmission</span>, de <span className="font-semibold text-secondary">partage</span> et de <span className="font-semibold text-secondary">convivialité</span> — où l&apos;on apprend ensemble, dans une ambiance chaleureuse, à créer des souvenirs gourmands.
          </p>
        </div>
      </section>
    </div>
  );
}
