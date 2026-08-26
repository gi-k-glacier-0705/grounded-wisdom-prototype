import { useState } from 'react'

export default function BreathingCircle() {
  const [isBreathing, setIsBreathing] = useState(false)

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={() => setIsBreathing(!isBreathing)}
        className="relative w-48 h-48 flex items-center justify-center"
        data-cursor-hover
      >
        {/* Outer glow ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-sage/30 transition-all duration-[4000ms] ${
            isBreathing ? 'scale-125 opacity-30' : 'scale-100 opacity-60'
          }`}
        />
        {/* Breathing circle */}
        <div
          className={`w-36 h-36 rounded-full bg-gradient-to-br from-sage/40 to-sage/20 flex items-center justify-center transition-all ${
            isBreathing ? 'animate-breathe' : ''
          }`}
          style={{
            boxShadow: isBreathing
              ? '0 0 30px rgba(120, 134, 107, 0.4), inset 0 0 30px rgba(120, 134, 107, 0.2)'
              : '0 0 15px rgba(120, 134, 107, 0.2)',
          }}
        >
          <span className="font-display text-lg text-deep-moss/80">
            {isBreathing ? 'Breathe' : 'Begin'}
          </span>
        </div>
        {/* Inner dot */}
        <div
          className={`absolute w-3 h-3 rounded-full bg-clay transition-all duration-[4000ms] ${
            isBreathing ? 'scale-150 opacity-80' : 'scale-100 opacity-40'
          }`}
        />
      </button>
      <p className="font-body text-sm text-deep-moss/60 text-center max-w-[200px]">
        {isBreathing
          ? 'Inhale as the circle expands. Exhale as it contracts.'
          : 'Tap the circle to begin a guided breathing exercise.'}
      </p>
    </div>
  )
}
