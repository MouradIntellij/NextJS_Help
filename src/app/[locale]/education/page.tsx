
import HeroSection from "../../components/HeroSection/HeroSection";
import InfoSection from "../../components/InfoSection/InfoSection";
import Citation from "../../components/Citation/Citation";
import { useTranslations } from "next-intl";

export default function Page() {

  const t = useTranslations('Education');
  const highlights = t.raw('highlights') as Record<string, { title: string; description: string }>;
  const highlightList = Object.values(highlights);
  const caseStudies = t.raw('caseStudies') as Record<string, { title: string; description: string }>;
  const caseStudiesList = Object.values(caseStudies);

  return (
    <div>
      <main>
      <HeroSection heading={t('hero')} black={true} imageName="education.jpg" />
        <InfoSection heading={t('title1')} highlights={highlightList} />
        <InfoSection heading={t('title2')} highlights={caseStudiesList} />
        <Citation quote={t('quote')} author={t('author')} />
      </main>
    </div>
  );
}
