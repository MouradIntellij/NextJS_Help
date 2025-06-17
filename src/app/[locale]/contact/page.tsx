// import FormSection from "../../components/FormSection/FormSection";
// import HeroSection from "../../components/HeroSection/HeroSection";
// import { useTranslations } from "next-intl";

// export default function Page() {

//   const t = useTranslations('Contact');

//   return (
//     <div>
//       <HeroSection heading={t('hero')} black={true} imageName="contact.jpg"/>
//       <FormSection/>
//     </div>
//   );
// }

'use client';
 
import { useState } from 'react';
 
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
 
  const [status, setStatus] = useState<string | null>(null);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
 
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
 
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };
 
  return (
<form onSubmit={handleSubmit}>
<input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
<input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
<textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" required />
<button type="submit">Send</button>
      {status === 'sending' && <p>Sending...</p>}
      {status === 'success' && <p>Email sent!</p>}
      {status === 'error' && <p>Failed to send.</p>}
</form>
  );
}


