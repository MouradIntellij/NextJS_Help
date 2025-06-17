import React from "react";
import { useTranslations } from 'next-intl';
import styles from "./textSection.module.css";

export default function MentorshipSection() {
  const t = useTranslations('Mentorship.TextSection');
  const listItems = t.raw('list') as Record<string, { strong: string; description: string }>;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        <p className={styles.highlight}>{t('highlight1')}</p>

        <p className={styles.paragraph}>{t('paragraph1')}</p>
        <p className={styles.paragraph}>
          {t('paragraph2')}
          <span className={styles.citation}>(Sambunjak et al., 2006; Straus et al., 2013)</span>
        </p>

        <h3 className={styles.heading}>{t('heading')}</h3>
        <p className={styles.paragraph}>{t('paragraph3')}</p>

        <ul className={styles.list}>
          {Object.values(listItems).map((item, index) => (
            <li key={index}>
              <strong>{item.strong}</strong> {item.description}
            </li>
          ))}
        </ul>

        <p className={styles.paragraph}>{t('paragraph4')}</p>

        <h4 className={styles.callToAction}>{t('callToAction')}</h4>
        <p className={styles.paragraph}>{t('paragraph5')}</p>
      </div>
    </section>
  );
}