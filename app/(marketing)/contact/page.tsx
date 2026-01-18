'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, Input, Textarea, Button } from '@/components/ui';

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact:', form);
  };

  return (
    <PageLayout title="Contactez-nous">
      <Card className="max-w-2xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Nom"
            type="text"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            label="Message"
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <Button type="submit" className="w-full">
            Envoyer
          </Button>
        </form>
      </Card>
    </PageLayout>
  );
}
