// 'use client';  

// import FormSection from '../components/FormSection/FormSection';
// export default function ContactPage() {
//   return (
//     <div>
//       <h1>Contactez-nous</h1>
//       <FormSection />
//     </div>
//   );
// }


'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Envoi en cours...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contactez-nous</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border p-2 rounded"
          type="text"
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="border p-2 rounded"
          name="message"
          placeholder="Votre message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-600 text-white py-2 rounded" type="submit">
          Envoyer
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </main>
  );
}

