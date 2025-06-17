import HeroSection from "../../components/HeroSection/HeroSection";
import TextSection from "../../components/Mentorship/TextSection/TextSection";
import FormSection from "../../components/Mentorship/FormSection/FormSection";
import { useTranslations } from "next-intl";

export default function Page() {

  const t = useTranslations('Mentorship')

  return (
    <div>
      <main>
        <HeroSection heading={t('hero')} imageName="mentorship.png"/>
        <TextSection/>
        <FormSection/>
      </main>
    </div>
  );
}