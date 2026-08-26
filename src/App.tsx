import Navigation from './components/Navigation'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import SourceCodeSection from './sections/SourceCodeSection'
import GroundedWisdomSection from './sections/GroundedWisdomSection'
import HumorSection from './sections/HumorSection'
import HealingSection from './sections/HealingSection'
import ActivismSection from './sections/ActivismSection'
import SanctuarySection from './sections/SanctuarySection'
import SupportSection from './sections/SupportSection'

function App() {
  return (
    <div className="relative">
      <CustomCursor />
      <Navigation />

      <main>
        <HeroSection />
        <SourceCodeSection />
        <GroundedWisdomSection />
        <HumorSection />
        <HealingSection />
        <ActivismSection />
        <SanctuarySection />
        <SupportSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
