import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';

interface Etape {
  titre: string;
  description: string;
}

interface Recette {
  id: string;
  titre: string;
  description: string;
  image: string;
  difficulte: string;
  temps: string;
  ingredients: string[];
  etapes: Etape[];
}

async function getRecettes(): Promise<Recette[]> {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), 'data', 'recettes.json'),
      'utf-8'
    );
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export default async function RecettesPage() {
  const recettes = await getRecettes();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Mes Recettes</h1>
      <p className="text-gray-600 mb-8">
        Retrouvez toutes les recettes apprises lors de vos ateliers
      </p>

      <div className="space-y-8">
        {recettes.map((recette) => (
          <div
            key={recette.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* En-tête de la recette */}
            <div className="md:flex">
              <div className="md:w-1/3 relative h-64 md:h-auto">
                <Image
                  src={recette.image}
                  alt={recette.titre}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {recette.titre}
                  </h2>
                  <div className="flex gap-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {recette.difficulte}
                    </span>
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                      {recette.temps}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{recette.description}</p>

                {/* Ingrédients */}
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

            {/* Étapes / Procédé */}
            <div className="border-t p-6 bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-4">Procédé</h3>
              <div className="space-y-4">
                {recette.etapes.map((etape, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
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
    </div>
  );
}
