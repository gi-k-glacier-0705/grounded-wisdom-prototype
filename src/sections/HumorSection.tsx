import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HumorGrid3D from '../components/HumorGrid3D'

gsap.registerPlugin(ScrollTrigger)

export default function HumorSection() {
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
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="humor"
      className="relative w-full py-24 md:py-36 bg-deep-moss overflow-hidden"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F8FFE5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl text-bio-white mb-4">
            The Truth Machine
          </h2>
          <p className="font-body text-lg text-bio-white/60 max-w-lg mx-auto">
            Where stoicism meets stand-up. Feed your burdens to the machine — receive truth wrapped in laughter.
          </p>
        </div>

        <HumorGrid3D />

        {/* Laughing philosophress image */}
        <div className="mt-20 flex justify-center">
          <div className="relative max-w-[400px]">
            <div className="rounded-lg overflow-hidden border border-taupe/20">
              <img
                src="/zen-laugh.jpg"
                alt="The Laughing Philosophress - zen ink wash portrait"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <p className="font-display text-xl text-bio-white/80 text-center mt-6 italic">
              "The Laughing Philosophress at full power"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
