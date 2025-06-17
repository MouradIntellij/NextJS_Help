import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from '../components/Header/header';
import Footer from '../components/Footer/Footer';
import { routing } from '@/i18n/routing';
import { Josefin_Sans } from 'next/font/google';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '700'],
  variable: '--font-josefin-sans',
  display: 'swap',
});

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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
