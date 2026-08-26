import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BreathingCircle from '../components/BreathingCircle'
import FlipCard from '../components/FlipCard'

gsap.registerPlugin(ScrollTrigger)

export default function HealingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cols = section.querySelectorAll('.healing-col')
      gsap.from(cols, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', message: '' })
    }, 3000)
  }

  return (
    <section
      ref={sectionRef}
      id="healing"
      className="relative w-full py-24 md:py-36 bg-parchment overflow-hidden"
    >
      {/* Rice paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-deep-moss mb-4">
            The Garden
          </h2>
          <p className="font-body text-lg text-deep-moss/60 max-w-lg mx-auto">
            Healing is not retreat. It is preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Breathing Exercise */}
          <div className="healing-col flex flex-col items-center">
            <h3 className="font-display text-2xl text-deep-moss mb-6">Nervous System First Aid</h3>
            <BreathingCircle />
          </div>

          {/* Column 2: BAM Practice */}
          <div className="healing-col flex flex-col items-center">
            <h3 className="font-display text-2xl text-deep-moss mb-6">BAM Practice</h3>
            <FlipCard
              className="w-full max-w-[280px] h-[320px]"
              front={
                <div className="w-full h-full liquid-glass rounded-xl flex flex-col items-center justify-center p-6">
                  <svg width="48" height="48" viewBox="0 0 48 48" className="mb-4 opacity-70">
                    <circle cx="24" cy="24" r="18" fill="none" stroke="#78866B" strokeWidth="1.5" />
                    <path d="M24 12v24M12 24h24" stroke="#78866B" strokeWidth="1" opacity="0.5" />
                  </svg>
                  <span className="font-display text-xl text-deep-moss">Breath & Movement</span>
                  <span className="font-body text-xs text-deep-moss/50 mt-2 tracking-widest uppercase">Click to explore</span>
                </div>
              }
              back={
                <div className="w-full h-full bg-mist rounded-xl flex flex-col items-center justify-center p-6 border border-taupe/30">
                  <h4 className="font-display text-lg text-deep-moss mb-3">18 Joint Rotations</h4>
                  <p className="font-body text-sm text-deep-moss/70 text-center mb-3">
                    Gentle circular movements to open energy pathways and restore mobility.
                  </p>
                  <h4 className="font-display text-lg text-deep-moss mb-3">Intestine Exercises</h4>
                  <p className="font-body text-sm text-deep-moss/70 text-center">
                    Core activation for digestive health and emotional grounding.
                  </p>
                </div>
              }
            />
          </div>

          {/* Column 3: Listening Post */}
          <div className="healing-col flex flex-col items-center">
            <h3 className="font-display text-2xl text-deep-moss mb-6">The Listening Post</h3>
            <div className="w-full max-w-[280px]">
              {submitted ? (
                <div className="text-center py-12">
                  <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto mb-4 text-sage">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 24l6 6 10-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="font-display text-lg text-deep-moss">Thank you</p>
                  <p className="font-body text-sm text-deep-moss/60">Your words have been received</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="font-body text-sm text-deep-moss/60 mb-4">
                    What weighs on your mind? Share anonymously.
                  </p>
                  <div>
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-taupe/40 py-2 font-body text-deep-moss placeholder:text-deep-moss/30 focus:outline-none focus:border-sage transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      required
                      className="w-full bg-transparent border-b border-taupe/40 py-2 font-body text-deep-moss placeholder:text-deep-moss/30 focus:outline-none focus:border-sage transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-12 h-12 rounded-full bg-sage flex items-center justify-center hover:bg-sage/80 transition-colors ml-auto"
                    data-cursor-hover
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="#F5F3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Cherry blossom image */}
        <div className="mt-20 flex justify-center">
          <div className="relative max-w-[300px]">
            <div className="rounded-lg overflow-hidden border border-taupe/30">
              <img
                src="/zen-portrait-serene.jpg"
                alt="Cherry blossom wreath with laughing text"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
