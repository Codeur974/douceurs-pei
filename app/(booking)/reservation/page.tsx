export default function Reservation() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-primary">Réservation</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <form className="space-y-6">
          <div>
            <label htmlFor="prestation" className="block font-semibold mb-2">Type de prestation</label>
            <select 
              id="prestation"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Sélectionnez une prestation</option>
              <option value="pack-decouverte">Pack Découverte</option>
              <option value="pack-premium">Pack Premium</option>
              <option value="atelier">Atelier</option>
              <option value="sur-mesure">Sur mesure</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block font-semibold mb-2">Date souhaitée</label>
            <input 
              type="date" 
              id="date"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="nom" className="block font-semibold mb-2">Nom complet</label>
            <input 
              type="text" 
              id="nom"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-2">Email</label>
            <input 
              type="email" 
              id="email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="telephone" className="block font-semibold mb-2">Téléphone</label>
            <input 
              type="tel" 
              id="telephone"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="details" className="block font-semibold mb-2">Détails de votre demande</label>
            <textarea 
              id="details" 
              rows={4}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition"
          >
            Confirmer la réservation
          </button>
        </form>
      </div>
    </div>
  );
}
