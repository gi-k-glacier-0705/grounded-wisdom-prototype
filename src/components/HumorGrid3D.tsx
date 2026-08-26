import { useState, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

interface HumorCard {
  topic: string
  insight: string
}

const HUMOR_CARDS: HumorCard[] = [
  { topic: 'Fear', insight: 'Fear is just excitement holding its breath. Let it exhale.' },
  { topic: 'Ego', insight: 'Your ego is a bad roommate. Always there, never pays rent.' },
  { topic: 'Anxiety', insight: 'Anxiety is just your brain doing parkour in a library.' },
  { topic: 'Perfectionism', insight: 'Perfect is the enemy of done. Done is the friend of happy.' },
  { topic: 'Imposter Syndrome', insight: 'Even impostors are doing the thing. That makes them real.' },
  { topic: 'Overthinking', insight: 'Your brain is not a crystal ball. It\'s a blender on high.' },
  { topic: 'Comparison', insight: 'Comparison is the thief of joy. And joy is a terrible thing to waste.' },
  { topic: 'Regret', insight: 'Regret is just wisdom arriving fashionably late to the party.' },
  { topic: 'Self-Doubt', insight: 'Doubt kills more dreams than failure ever did. Be brave, be bad, be you.' },
]

function HumorCardComponent({ card, index }: { card: HumorCard; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    if (!innerRef.current) return
    const newFlipped = !flipped
    setFlipped(newFlipped)

    gsap.to(innerRef.current, {
      rotateY: newFlipped ? 180 : 0,
      duration: 0.6,
      ease: 'power2.inOut',
    })
  }, [flipped])

  return (
    <div
      ref={cardRef}
      className="relative w-full aspect-square perspective-[1000px]"
      onClick={handleClick}
      data-cursor-hover
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        ref={innerRef}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 liquid-glass rounded-lg flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="font-display text-2xl text-bio-white mb-2">{card.topic}</span>
          <span className="font-body text-xs text-bio-white/60 tracking-widest uppercase">Click to flip</span>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-parchment/95 rounded-lg flex flex-col items-center justify-center p-6"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="font-display text-lg text-deep-moss text-center leading-relaxed">
            {card.insight}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function HumorGrid3D() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[800px] mx-auto">
      {HUMOR_CARDS.map((card, i) => (
        <HumorCardComponent key={card.topic} card={card} index={i} />
      ))}
    </div>
  )
}
