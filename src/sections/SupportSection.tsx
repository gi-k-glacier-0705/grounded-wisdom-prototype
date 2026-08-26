import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SUPPORT_LINKS = [
  { label: 'Buy Me a Coffee', href: 'https://buymeacoffee.com', icon: '☕' },
  { label: 'PayPal', href: 'https://paypal.com', icon: '🌿' },
  { label: 'Venmo', href: 'https://venmo.com', icon: '💚' },
  { label: 'GitHub Sponsors', href: 'https://github.com/sponsors', icon: '⭐' },
]

export default function SupportSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.support-content', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.support-btn', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.support-image', {
        opacity: 0,
        x: 40,
        duration: 1,
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
      id="support"
      className="relative w-full py-24 md:py-36 bg-parchment overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="support-content">
            <h2 className="font-display text-4xl md:text-5xl text-deep-moss mb-6">
              Support the Sanctuary
            </h2>

            <p className="font-body text-lg text-deep-moss/80 mb-4" style={{ lineHeight: 1.7 }}>
              This work costs nothing to read. It costs something to make. If these words have
              settled in your bones, consider offering a cup of tea.
            </p>

            <p className="font-body text-base text-deep-moss/60 mb-10 italic">
              "Every act of generosity ripples outward in ways we cannot measure."
            </p>

            <div className="flex flex-wrap gap-4">
              {SUPPORT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-btn inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-sage/30 text-deep-moss font-body text-sm hover:bg-sage hover:text-parchment transition-all"
                  data-cursor-hover
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="support-image flex justify-center lg:justify-end">
            <div className="relative max-w-[400px]">
              <div className="rounded-lg overflow-hidden border border-taupe/40 shadow-lg">
                <img
                  src="/warrior-guardian.jpg"
                  alt="Guardian portrait with dog - zen ink wash style"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative elements */}
              <div
                className="absolute -bottom-3 -left-3 w-full h-full rounded-lg border border-sage/20 -z-10"
              />
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10"
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
