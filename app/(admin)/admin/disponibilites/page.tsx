export default function AdminDisponibilites() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestion des Disponibilités</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Calendrier des disponibilités</h2>
        <p className="text-gray-600 mb-6">
          Gérez vos disponibilités pour les livraisons et les ateliers.
        </p>
        
        <div className="grid grid-cols-7 gap-2">
          {/* Placeholder pour un calendrier */}
          {[...Array(35)].map((_, i) => (
            <div 
              key={i} 
              className="aspect-square border rounded flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
