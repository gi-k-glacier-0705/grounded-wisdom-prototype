import MeditationFog from '../components/MeditationFog'

export default function HeroSection() {
  const handleEnter = () => {
    const wisdomSection = document.querySelector('#wisdom')
    if (wisdomSection) {
      wisdomSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <MeditationFog />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="liquid-glass rounded-2xl px-12 py-10 max-w-lg mx-4 text-center">
          {/* Enso decoration */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            className="mx-auto mb-6 opacity-60"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#F8FFE5"
              strokeWidth="1"
              strokeDasharray="100 12"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>

          <h1
            className="font-display text-5xl md:text-7xl text-bio-white mb-4"
            style={{
              textShadow: '0 2px 20px rgba(58, 74, 63, 0.3)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Ground Wisdom
          </h1>

          <p className="font-body text-base md:text-lg text-mist mb-8" style={{ lineHeight: 1.6 }}>
            A digital sanctuary for the permeable self
          </p>

          <button
            onClick={handleEnter}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-pill bg-clay text-parchment font-body text-sm font-medium tracking-wide hover:bg-clay/90 transition-colors"
            data-cursor-hover
          >
            <span>Enter the Sanctuary</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-bounce">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
