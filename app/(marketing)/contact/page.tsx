export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Contactez-nous</h1>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="nom" className="block font-semibold mb-2">Nom</label>
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
            <label htmlFor="message" className="block font-semibold mb-2">Message</label>
            <textarea 
              id="message" 
              rows={6}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
