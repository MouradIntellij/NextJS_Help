// src/app/[locale]/page.tsx
import './home.css';
import '../parallax.css';
import Citation from '../components/Citation/Citation';
import { heroSection, whyMarcos, socialLinks } from '../data/homeData';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Page() {
  const t = useTranslations('Home');
  const areas = ['clinical', 'education', 'business'];

  return (
    <main>
      {/* Hero Section */}
      <section id="section1" className="home-section">
        <img src={heroSection.image} alt="Welcome Image" />
        <div className="text-content">
          <h1>Marcos Rodrigues</h1>
          <h2>PT, MSc, MBA</h2>
          <p>{t('hero')}</p>
        </div>
      </section>

      {/* Why Marcos Section */}
      <section id="section2" className="home-section parallax-container">
        <div
          className="parallax-background"
          style={{ backgroundImage: `url('${whyMarcos.backgroundImage}')` }}
        ></div>
        <h1>{t('whyMarcos1')}</h1>
        <p>{t('whyMarcos2')}</p>
      </section>

      {/* Expertise Section */}
      <section id="section3" className="home-section">
        <div className="expertise-grid">
          {areas.map((area) => (
            <div key={area} className={`expertise-box ${area}`}>
              <h1>{t(`areas.${area}`)}</h1>
              <div className="expertise-overlay">
                <p>{t(`descriptions.${area}`)}</p>
                <a href={`/${area}`} className="learn-more-button">
                  {t('knowMore')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Section */}
      <section id="section4" className="home-section parallax-container">
        <div
          className="parallax-background"
          style={{ backgroundImage: `url('${whyMarcos.backgroundImage}')` }}
        ></div>
        <div className="social-grid">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-box ${social.className}`}
            >
              <img src={social.icon} alt={`${social.name} Icon`} />
            </Link>
          ))}
        </div>
      </section>

      {/* Citation Section */}
      <Citation quote={t('quote')} author="Marcos Rodrigues" />
    </main>
  );
}
