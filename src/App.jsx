import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TrustBar from "./components/TrustBar";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import LeadMagnetSection from "./components/LeadMagnetSection";
import CredentialsSection from "./components/CredentialsSection";
import DifferentialsSection from "./components/DifferentialsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";
import FaqSection from "./components/FaqSection";
import FinalCtaSection from "./components/FinalCtaSection";
import CroPopupManager from "./components/CroPopupManager";
import Footer from "./components/Footer";
import StickyWhatsApp from "./components/StickyWhatsApp";
import {
  aboutHighlights,
  brandAssets,
  credentials,
  differentials,
  services,
  testimonials,
  trustItems,
} from "./data/content";

export default function App() {
  return (
    <div className="page-shell">
      <div id="inicio" className="page-top-anchor" />

      <div className="page-frame">
        <Header logo={brandAssets.logo} />
        <HeroSection heroArtwork={brandAssets.heroArtwork} />
        <TrustBar items={trustItems} />
        <ServicesSection items={services} />
        <AboutSection photo={brandAssets.aboutPhoto} highlights={aboutHighlights} />
        <LeadMagnetSection />
        <CredentialsSection items={credentials} />
        <DifferentialsSection items={differentials} />
        <TestimonialsSection items={testimonials} />

        <section className="section gallery-contact-grid">
          <GallerySection photos={brandAssets.gallery} />
          <ContactSection />
        </section>

        <FaqSection photo="/imagenes/gallery-f.jpg" />

        <FinalCtaSection />
        <Footer />
      </div>

      <CroPopupManager />
      <StickyWhatsApp />
    </div>
  );
}
