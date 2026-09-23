import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import FunctionalMedicineTelehealthBanner from "@/components/home/FunctionalMedicineTelehealthBanner";
import LocationCTABanner from "@/components/home/LocationCTABanner";
import BetterCareSection from "@/components/home/BetterCareSection";
import ConsultationCallBanner from "@/components/home/ConsultationCallBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import MeetTeamSection from "@/components/home/MeetTeamSection";
import MissionBanner from "@/components/home/MissionBanner";
import ArticlesSection from "@/components/home/ArticlesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import HoursContactSection from "@/components/home/HoursContactSection";
import LocationMapSection from "@/components/home/LocationMapSection";
import DoctorSnippetSection from "@/components/home/DoctorSnippetSection";
import QuestionFormSection from "@/components/home/QuestionFormSection";

export default function HomePageView() {
  return (
    <main>
      <HeroSection />
      <WelcomeSection />
      <FunctionalMedicineTelehealthBanner />
      <LocationCTABanner />
      <BetterCareSection />
      <ConsultationCallBanner />
      <TestimonialsSection />
      <ServicesGrid />
      <MeetTeamSection />
      <DoctorSnippetSection />
      <MissionBanner />
      <ArticlesSection />
      <QuestionFormSection />
      <NewsletterSection />
      <HoursContactSection />
      <LocationMapSection />
    </main>
  );
}
