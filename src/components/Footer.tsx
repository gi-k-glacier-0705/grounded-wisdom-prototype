export default function Footer() {
  return (
    <footer className="w-full py-12 bg-deep-moss">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-bio-white/60">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="60 8"
              />
            </svg>
            <span className="font-body text-xs text-bio-white/50 tracking-[0.15em] uppercase">
              Ground Wisdom
            </span>
          </div>

          {/* Tagline */}
          <p className="font-display text-sm text-bio-white/40 italic text-center">
            "I am already the source code."
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="font-body text-xs text-bio-white/40 hover:text-bio-white/70 transition-colors tracking-wider uppercase"
              data-cursor-hover
            >
              Return to top
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-bio-white/10 text-center">
          <p className="font-body text-xs text-bio-white/30">
            A digital sanctuary crafted with intention
          </p>
        </div>
      </div>
    </footer>
  )
}
