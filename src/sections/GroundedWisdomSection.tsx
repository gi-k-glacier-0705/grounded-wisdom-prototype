import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WisdomConstellation from '../components/WisdomConstellation'

gsap.registerPlugin(ScrollTrigger)

const FLOATING_QUOTES = [
  { text: 'Knowing yourself is true wisdom.', x: '15%', y: '20%' },
  { text: 'Be the change. Literally.', x: '65%', y: '35%' },
  { text: 'Healing is not retreat. It is preparation.', x: '25%', y: '60%' },
  { text: 'Energy is honest.', x: '75%', y: '70%' },
  { text: 'Compassion is biology.', x: '45%', y: '45%' },
]

export default function GroundedWisdomSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      const cards = section.querySelectorAll('.wisdom-card')
      gsap.from(cards, {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="wisdom"
      className="relative w-full min-h-screen py-24 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #78866B 0%, #F5F3EE 100%)',
      }}
    >
      {/* Particle canvas background */}
      <WisdomConstellation variant="light" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2
            className="font-display text-4xl md:text-5xl text-bio-white mb-4"
            style={{ textShadow: '0 2px 10px rgba(58, 74, 63, 0.3)' }}
          >
            Grounded Wisdom
          </h2>
          <p className="font-body text-lg text-bio-white/70 max-w-md mx-auto">
            Click the glowing nodes in the constellation to reveal wisdom stones
          </p>
        </div>

        {/* Floating quote cards */}
        <div className="relative h-[500px] md:h-[600px]">
          {FLOATING_QUOTES.map((quote, i) => (
            <div
              key={i}
              className="wisdom-card liquid-glass rounded-xl px-6 py-4 absolute max-w-[260px]"
              style={{
                left: quote.x,
                top: quote.y,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <p className="font-display text-lg text-deep-moss text-center" style={{ lineHeight: 1.4 }}>
                {quote.text}
              </p>
            </div>
          ))}
        </div>

        {/* Additional wisdom stones grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {[
            { stone: 'Rigid hierarchies harm.', ref: 'Sapolsky' },
            { stone: 'Every person is an opportunity to improve society.', ref: '' },
            { stone: 'Joy makes you a more effective activist.', ref: '' },
            { stone: 'The Self is permeable.', ref: 'Quantum boundaries' },
            { stone: 'Contemplative living IS social change.', ref: '' },
            { stone: 'A river doesn\'t fight, it flows.', ref: 'Wu Wei' },
          ].map((item, i) => (
            <div
              key={i}
              className="wisdom-card bg-parchment/80 backdrop-blur-sm rounded-lg p-6 border border-taupe/30 hover:border-sage/50 transition-all hover:shadow-glow group"
              data-cursor-hover
            >
              <p className="font-display text-xl text-deep-moss mb-2" style={{ lineHeight: 1.4 }}>
                {item.stone}
              </p>
              {item.ref && (
                <span className="font-body text-xs text-sage tracking-wider uppercase">
                  {item.ref}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
