import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from '../components/Header/header';
import Footer from '../components/Footer/Footer';
import { routing } from '@/i18n/routing';
import { Josefin_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '700'],
  variable: '--font-josefin-sans',
  display: 'swap',
});

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

// ✅ Typage recommandé par Next.js
export type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = locale === 'en' ? en : fr;

  return (
    <div className={josefinSans.variable}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}

// ✅ Correction typage Next.js 15.x → indique les locales générées
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ✅ Metadata avec typage correct
export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: params.locale === 'fr' ? 'Accueil - Français' : 'Home - English',
  };
}
