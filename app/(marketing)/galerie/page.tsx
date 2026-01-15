export default function Galerie() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Galerie</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Découvrez nos créations gourmandes et laissez-vous inspirer
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Image {i}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
