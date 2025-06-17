
import BtgSection from "../../components/BtgSection/BtgSection";
import HeroSection from "../../components/HeroSection/HeroSection";
import InfoSection from "../../components/InfoSection/InfoSection";
import Citation from "../../components/Citation/Citation";
import { useTranslations } from "next-intl";


export default function Page() {

  const t = useTranslations('Business');
  const slides = t.raw('slides') as Record<string, { title: string; subHeading: string; content: string, finish?: string | null}>
  const slidesList = Object.values(slides);
  const highlights = t.raw('highlights') as Record<string, { title: string; description: string }>;
  const highlightList = Object.values(highlights);
  const caseStudies = t.raw('caseStudies') as Record<string, { title: string; description: string }>;
  const caseStudiesList = Object.values(caseStudies);

  return (
    <div>
      <main>
        <HeroSection heading={t('hero')} h1Adjust={true} imageName="business2.png" />
        <BtgSection slides={slidesList}/>
        <InfoSection heading={t('title1')} highlights={highlightList} />
        <InfoSection heading={t('title2')} highlights={caseStudiesList} />
        <Citation quote={t('quote')} author={t('author')} />
      </main>
    </div>
  );
}
