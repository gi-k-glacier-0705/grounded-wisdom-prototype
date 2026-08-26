import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Grounded Wisdom', href: '#wisdom' },
  { label: 'Humor', href: '#humor' },
  { label: 'Healing', href: '#healing' },
  { label: 'Activism', href: '#activism' },
  { label: 'Sanctuary', href: '#sanctuary' },
  { label: 'Support', href: '#support' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'liquid-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-3 group"
          data-cursor-hover
        >
          {/* Enso seal */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="opacity-80 group-hover:opacity-100 transition-opacity"
          >
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke={scrolled ? '#3A4A3F' : '#F8FFE5'}
              strokeWidth="1.5"
              strokeDasharray="80 8"
              strokeLinecap="round"
            />
          </svg>
          <span
            className={`font-body text-xs font-medium tracking-[0.15em] uppercase transition-colors ${
              scrolled ? 'text-deep-moss' : 'text-bio-white'
            }`}
          >
            Ground Wisdom
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`font-body text-xs font-medium tracking-[0.05em] uppercase transition-all hover:opacity-100 ${
                scrolled
                  ? 'text-deep-moss/70 hover:text-deep-moss'
                  : 'text-bio-white/70 hover:text-bio-white'
              }`}
              data-cursor-hover
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-cursor-hover
        >
          <div className={`w-5 h-0.5 mb-1.5 transition-all ${scrolled ? 'bg-deep-moss' : 'bg-bio-white'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-5 h-0.5 mb-1.5 transition-all ${scrolled ? 'bg-deep-moss' : 'bg-bio-white'} ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 transition-all ${scrolled ? 'bg-deep-moss' : 'bg-bio-white'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden liquid-glass mt-2 mx-4 rounded-lg p-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="font-body text-sm text-deep-moss/80 hover:text-deep-moss transition-colors"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
