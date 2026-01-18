import fs from "fs/promises";
import path from "path";
import { Nav } from "@/components/layout/Nav";
import { ImageGallery } from "@/components/ui/ImageModal";

interface GalerieImage {
  id: string;
  src: string;
  title: string;
}

async function getImages(): Promise<GalerieImage[]> {
  try {
    const dataPath = path.join(process.cwd(), "data", "galerie.json");
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Tailles variées pour effet Pinterest
const sizePatterns = [
  "row-span-2", // grande verticale
  "",           // normale
  "",           // normale
  "col-span-2", // large horizontale
  "",           // normale
  "row-span-2", // grande verticale
  "",           // normale
  "",           // normale
];

export default async function Galerie() {
  const images = await getImages();
  return (
    <>
      {/* Header avec fond dégradé et étoiles */}
      <div className="relative bg-linear-to-br from-primary/20 via-secondary/10 to-primary/20 overflow-hidden">
        {/* Étoiles décoratives */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute top-4 left-[10%] text-primary text-2xl animate-pulse opacity-60">✦</span>
          <span className="absolute top-8 right-[15%] text-secondary text-xl animate-pulse opacity-70">✧</span>
          <span className="absolute top-12 left-[30%] text-primary text-xl animate-pulse opacity-50">✦</span>
          <span className="absolute bottom-6 right-[25%] text-secondary text-2xl animate-pulse opacity-60">✧</span>
          <span className="absolute bottom-10 left-[20%] text-primary text-lg animate-pulse opacity-70">✦</span>
          <span className="absolute top-6 right-[40%] text-secondary text-xl animate-pulse opacity-50">✧</span>
          <span className="absolute bottom-4 right-[10%] text-primary text-xl animate-pulse opacity-60">✦</span>
          <span className="absolute top-16 left-[50%] text-secondary text-2xl animate-pulse opacity-70">✧</span>
          <span className="absolute top-2 left-[60%] text-primary text-lg animate-pulse opacity-50">✦</span>
          <span className="absolute bottom-8 left-[45%] text-secondary text-xl animate-pulse opacity-60">✧</span>
          <span className="absolute top-10 right-[5%] text-primary text-2xl animate-pulse opacity-70">✦</span>
          <span className="absolute bottom-2 left-[5%] text-secondary text-lg animate-pulse opacity-50">✧</span>
        </div>
        <Nav />
        <div className="container mx-auto px-4 py-12 text-center relative z-10">
          <h1 className="text-primary">Découvrez mes créations gourmandes</h1>
        </div>
      </div>

      {/* Galerie avec fond subtil et étoiles */}
      <div className="relative bg-linear-to-b from-primary/10 via-secondary/5 to-primary/10 py-12 overflow-hidden">
        {/* Étoiles d'arrière-plan */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute top-10 left-[3%] text-primary text-2xl opacity-50">✦</span>
          <span className="absolute top-20 right-[5%] text-secondary text-xl opacity-60">✧</span>
          <span className="absolute top-32 left-[8%] text-primary text-lg opacity-40">✦</span>
          <span className="absolute top-48 right-[3%] text-secondary text-2xl opacity-50">✧</span>
          <span className="absolute top-[20%] left-[5%] text-primary text-xl opacity-60">✦</span>
          <span className="absolute top-[25%] right-[8%] text-secondary text-lg opacity-40">✧</span>
          <span className="absolute top-[35%] left-[3%] text-primary text-2xl opacity-50">✦</span>
          <span className="absolute top-[40%] right-[5%] text-secondary text-xl opacity-60">✧</span>
          <span className="absolute top-[50%] left-[8%] text-primary text-lg opacity-40">✦</span>
          <span className="absolute top-[55%] right-[3%] text-secondary text-2xl opacity-50">✧</span>
          <span className="absolute top-[65%] left-[5%] text-primary text-xl opacity-60">✦</span>
          <span className="absolute top-[70%] right-[8%] text-secondary text-lg opacity-40">✧</span>
          <span className="absolute top-[80%] left-[3%] text-primary text-2xl opacity-50">✦</span>
          <span className="absolute top-[85%] right-[5%] text-secondary text-xl opacity-60">✧</span>
          <span className="absolute bottom-20 left-[8%] text-primary text-lg opacity-40">✦</span>
          <span className="absolute bottom-10 right-[3%] text-secondary text-2xl opacity-50">✧</span>
        </div>
        <div className="container mx-auto px-4">
          <ImageGallery images={images} sizePatterns={sizePatterns} />
        </div>
      </div>
    </>
  );
}
