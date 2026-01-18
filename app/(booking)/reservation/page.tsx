'use client';

import { useReservationStore } from '@/lib/stores';
import { Card, Input, Textarea, Select, Button } from '@/components/ui';

const prestationOptions = [
  { value: 'pack-decouverte', label: 'Pack Découverte' },
  { value: 'pack-premium', label: 'Pack Premium' },
  { value: 'atelier', label: 'Atelier' },
  { value: 'sur-mesure', label: 'Sur mesure' },
];

export default function Reservation() {
  const { data, setField } = useReservationStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Réservation:', data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-primary">Réservation</h1>
      <Card>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Select
            label="Type de prestation"
            options={prestationOptions}
            placeholder="Sélectionnez une prestation"
            value={data.prestation}
            onChange={(e) => setField('prestation', e.target.value)}
          />
          <Input
            label="Date souhaitée"
            type="date"
            value={data.date}
            onChange={(e) => setField('date', e.target.value)}
          />
          <Input
            label="Nom complet"
            type="text"
            value={data.nom}
            onChange={(e) => setField('nom', e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={data.email}
            onChange={(e) => setField('email', e.target.value)}
          />
          <Input
            label="Téléphone"
            type="tel"
            value={data.telephone}
            onChange={(e) => setField('telephone', e.target.value)}
          />
          <Textarea
            label="Détails de votre demande"
            rows={4}
            value={data.details}
            onChange={(e) => setField('details', e.target.value)}
          />
          <Button type="submit" className="w-full">
            Confirmer la réservation
          </Button>
        </form>
      </Card>
    </div>
  );
}
