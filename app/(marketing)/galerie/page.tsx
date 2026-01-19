import { GalerieService } from "@/lib/services";
import { Nav } from "@/components/layout/Nav";
import { ImageGallery } from "@/components/ui/ImageModal";

const sizePatterns = [
  "row-span-2", "", "", "col-span-2", "", "row-span-2", "", "",
];

export default async function Galerie() {
  const images = await GalerieService.getAll();

  return (
    <>
      <div className="relative bg-linear-to-br from-primary/20 via-secondary/10 to-primary/20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute top-4 left-[10%] text-primary text-2xl animate-pulse opacity-60">✦</span>
          <span className="absolute top-8 right-[15%] text-secondary text-xl animate-pulse opacity-70">✧</span>
          <span className="absolute top-12 left-[30%] text-primary text-xl animate-pulse opacity-50">✦</span>
          <span className="absolute bottom-6 right-[25%] text-secondary text-2xl animate-pulse opacity-60">✧</span>
          <span className="absolute bottom-10 left-[20%] text-primary text-lg animate-pulse opacity-70">✦</span>
          <span className="absolute top-6 right-[40%] text-secondary text-xl animate-pulse opacity-50">✧</span>
        </div>
        <Nav />
        <div className="container mx-auto px-4 py-12 text-center relative z-10">
          <h1 className="text-primary">Découvrez mes créations gourmandes</h1>
        </div>
      </div>

      <div className="relative bg-linear-to-b from-primary/10 via-secondary/5 to-primary/10 py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <ImageGallery images={images} sizePatterns={sizePatterns} />
        </div>
      </div>
    </>
  );
}
