import React from 'react';
import styles from './footer.module.css';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function Footer() {

  const t = useTranslations('Footer');

  return(
    <footer className={styles.footerContent}>
    <div className={styles.footerLinks}>
      <Link href="/" className={styles.footerLink}>{t('home')}</Link>
      <Link href="/clinical" className={styles.footerLink}>{t('clinical')}</Link>
      <Link href="/education" className={styles.footerLink}>{t('education')}</Link>
      <Link href="/business" className={styles.footerLink}>{t('business')}</Link>
      <Link href="/mentorship" className={styles.footerLink}>{t('mentorship')}</Link>
      <Link href="/contact" className={styles.footerLink}>{t('contact')}</Link>
    </div>
    <div className={styles.footerInfo}>
      <p>&copy; 2025 Marcos Rodrigues. All rights reserved.</p>
      <p>Ontario, Canada</p>
      <p>info@marcosrodrigues.ca</p>
    </div>
  </footer>
  );
}