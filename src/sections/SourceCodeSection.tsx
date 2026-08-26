import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EnsoCircle from '../components/EnsoCircle'

gsap.registerPlugin(ScrollTrigger)

const BRANCHES = [
  { title: 'The Seeker', desc: 'High school reading, Tao Te Ching, Way of the Peaceful Warrior, Ch\'an studies' },
  { title: 'The Student', desc: 'BDIC — Contemplative Living as Social Change. UMass Amherst, Neruda, Social Movements, Dance Composition, Evolutionary Medicine' },
  { title: 'The Teacher', desc: 'BAM — Breath & Movement. Phoenix Project, UACT, Self-Care as Activism' },
  { title: 'The Survivor', desc: 'Dahn Yoga lawsuit, exit from manipulation, rebuilding on authentic ground' },
  { title: 'The Technologist', desc: 'Geek Squad, coding, building Cosmic Wonder on GitHub Pages, digital craft as practice' },
  { title: 'The Philosophress', desc: 'The Laughing Philosophress emerges. Humor + wisdom + science as one breath' },
]

export default function SourceCodeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const branchesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 40,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      if (branchesRef.current) {
        const items = branchesRef.current.querySelectorAll('.branch-item')
        gsap.from(items, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: branchesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 bg-parchment"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Text */}
          <div ref={textRef}>
            <h2
              className="font-display text-4xl md:text-5xl text-deep-moss mb-6"
              style={{ letterSpacing: '-0.01em' }}
            >
              Source Code
            </h2>

            <p className="font-body text-lg text-deep-moss/80 mb-8" style={{ lineHeight: 1.7 }}>
              The first feeling I remember was a piercing desire to know myself. Through seeking,
              surviving, and philosophizing, the Laughing Philosophress emerged — where humor,
              wisdom, and science become one breath.
            </p>

            <div className="mb-8">
              <EnsoCircle />
            </div>

            {/* Branches */}
            <div ref={branchesRef} className="space-y-4 mt-8">
              {BRANCHES.map((branch, i) => (
                <div
                  key={branch.title}
                  className="branch-item flex gap-4 items-start p-4 rounded-lg hover:bg-mist/50 transition-colors group"
                  data-cursor-hover
                >
                  <span className="font-display text-clay text-lg mt-0.5">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl text-deep-moss mb-1 group-hover:text-sage transition-colors">
                      {branch.title}
                    </h3>
                    <p className="font-body text-sm text-deep-moss/60" style={{ lineHeight: 1.6 }}>
                      {branch.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait */}
          <div ref={imageRef} className="lg:sticky lg:top-32">
            <div className="relative">
              <div className="rounded-lg overflow-hidden border border-taupe/40">
                <img
                  src="/zenga-portrait.jpg"
                  alt="Zen portrait - contemplative ink wash painting"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative ink splatter */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle, #3A4A3F 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute -top-6 -left-6 w-16 h-16 rounded-full opacity-10"
                style={{
                  background: 'radial-gradient(circle, #78866B 0%, transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
