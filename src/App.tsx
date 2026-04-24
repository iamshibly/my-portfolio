import Layout from './layout/Layout';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import EducationSection from './sections/EducationSection';
import ResearchSection from './sections/ResearchSection';
import PublicationsSection from './sections/PublicationsSection';
import ProjectsSection from './sections/ProjectsSection';
import CollaboratorsSection from './sections/CollaboratorsSection';
import ExperienceSection from './sections/ExperienceSection';
import SkillsSection from './sections/SkillsSection';
import CertificationsSection from './sections/CertificationsSection';
import NewsSection from './sections/NewsSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';

const App = () => (
  <Layout>
    <HeroSection />
    <AboutSection />
    <EducationSection />
    <ResearchSection />
    <PublicationsSection />
    <ProjectsSection />
    <CollaboratorsSection />
    <ExperienceSection />
    <SkillsSection />
    <CertificationsSection />
    <NewsSection />
    <ContactSection />
    <Footer />
  </Layout>
);

export default App;
