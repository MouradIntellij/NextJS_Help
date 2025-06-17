'use client';

import { useEffect, useState } from 'react';
import styles from './formSection.module.css';
import { useTranslations } from 'next-intl';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function FormSection() {
  const [subject, setSubject] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const t = useTranslations('Contact');

  // Charger reCAPTCHA une seule fois côté client
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('recaptcha-script')) {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window === 'undefined') return;

    const token = window.grecaptcha?.getResponse();

    if (!token) {
      alert('Please verify you are not a robot!');
      return;
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, subject, token }),
    });

    if (res.ok) {
      alert('Message sent!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
      setSubject('');
      window.grecaptcha?.reset();
    } else {
      alert('Error sending message.');
    }
  };

  return (
    <main className={styles.contactMain}>
      <div className={styles.contactTitle}>
        <h1>{t('title')}</h1>
      </div>

      <div className={styles.contactContainer}>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="firstName"
              placeholder={t('firstName')}
              onChange={handleChange}
              value={formData.firstName}
              required
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="text"
              name="lastName"
              placeholder={t('lastName')}
              onChange={handleChange}
              value={formData.lastName}
              required
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="tel"
              name="phone"
              placeholder={t('telephone')}
              onChange={handleChange}
              value={formData.phone}
            />
          </div>

          <div className={styles.formRow}>
            <h2>{t('subject')}</h2>
            <div className={styles.subjectOptions}>
              {['Clinical', 'Education', 'Business', 'Others'].map((option) => (
                <label
                  key={option}
                  className={`${styles.radioLabel} ${subject === option ? styles.selected : ''}`}
                >
                  <input
                    type="radio"
                    name="subject"
                    value={option}
                    checked={subject === option}
                    onChange={() => setSubject(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formRow}>
            <textarea
              name="message"
              placeholder="Message"
              onChange={handleChange}
              value={formData.message}
              required
            ></textarea>
          </div>

          {/* reCAPTCHA v2 */}
          <div
            className="g-recaptcha"
            data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          ></div>

          <div className={styles.formRow}>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>

        <div className={styles.contactInfo}>
          <h3 className={styles.infoItems}>Contact Details</h3>
          <p className={styles.infoItems}>Marcos Rodrigues</p>
          <p className={styles.infoItems}>Ontario, Canada</p>
          <p className={styles.infoItems}>info@marcosrodrigues.ca</p>
          <p className={styles.infoItems}>+1 (705) 333-6682</p>
        </div>
      </div>
    </main>
  );
}
