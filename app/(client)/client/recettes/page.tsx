import Image from 'next/image';
import { RecettesService } from '@/lib/services';

export default async function RecettesPage() {
  const recettes = await RecettesService.getAll();

  const difficulteLabel = (difficulte: string) => {
    switch (difficulte) {
      case 'FACILE': return 'Facile';
      case 'INTERMEDIAIRE': return 'Intermédiaire';
      case 'AVANCE': return 'Avancé';
      default: return difficulte;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Mes Recettes</h1>
      <p className="text-gray-600 mb-8">Retrouvez toutes les recettes apprises lors de vos ateliers</p>

      {recettes.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <p className="text-gray-500">Aucune recette disponible pour le moment</p>
        </div>
      ) : (
        <div className="space-y-8">
          {recettes.map((recette) => (
            <div key={recette.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative h-64 md:h-auto">
                  <Image src={recette.image} alt={recette.titre} fill className="object-cover" />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{recette.titre}</h2>
                    <div className="flex gap-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{difficulteLabel(recette.difficulte)}</span>
                      <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">{recette.temps}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{recette.description}</p>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Ingrédients</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {recette.ingredients.map((ingredient, i) => (
                        <li key={i} className="text-gray-600 text-sm flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-t p-6 bg-gray-50">
                <h3 className="font-semibold text-gray-800 mb-4">Procédé</h3>
                <div className="space-y-4">
                  {recette.etapes.map((etape, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                      <div>
                        <h4 className="font-medium text-gray-800">{etape.titre}</h4>
                        <p className="text-gray-600 text-sm mt-1">{etape.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
