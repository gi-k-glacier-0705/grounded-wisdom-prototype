# Ground Wisdom — Technical Specification

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v3
- shadcn/ui
- @fontsource/instrument-serif + @fontsource/source-sans-3
- three + @react-three/fiber + @react-three/drei + three-custom-shader-material
- html2canvas
- gsap

## Project Structure

```
app/
├── public/
│   ├── zen-portrait-serene.jpg
│   ├── warrior-guardian.jpg
│   └── rice-paper-texture.png
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Navigation.tsx
│   │   ├── LiquidGlass.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── MeditationFog.tsx
│   │   ├── WisdomConstellation.tsx
│   │   ├── HumorGrid3D.tsx
│   │   ├── EnsoCircle.tsx
│   │   ├── BreathingCircle.tsx
│   │   └── FlipCard.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── SourceCodeSection.tsx
│   │   ├── GroundedWisdomSection.tsx
│   │   ├── HumorSection.tsx
│   │   ├── HealingSection.tsx
│   │   ├── ActivismSection.tsx
│   │   └── SupportSection.tsx
│   ├── hooks/
│   │   ├── useWisdomConstellation.ts
│   │   └── useSmoothScroll.ts
│   ├── shaders/
│   │   ├── fogVertex.glsl
│   │   └── fogFragment.glsl
│   └── lib/
│       └── utils.ts
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## Component Inventory

### Layout
- **Navigation**: Fixed top bar, liquid glass treatment, links to all sections via smooth scroll
- **LiquidGlass**: Reusable component applying the liquid glass visual treatment (subtle refraction, edge glow, low opacity)
- **CustomCursor**: 4px circle expanding to 40px with mix-blend-mode:difference on interactive hover

### Sections
- **HeroSection**: Full-screen MeditationFog background, centered title/subtitle/CTA in liquid glass card
- **SourceCodeSection**: 2-column layout, text left, portrait right, EnsoCircle interactive element
- **GroundedWisdomSection**: Sage-to-Parchment gradient, WisdomConstellation canvas with floating quote cards
- **HumorSection**: Deep Moss background, 3x3 HumorGrid3D interactive flip cards
- **HealingSection**: Parchment with rice paper texture, 3-column grid (BreathingCircle, FlipCard, ListeningPost form)
- **ActivismSection**: WisdomConstellation canvas in dark mode, clickable star nodes revealing activist principles
- **SupportSection**: Centered layout, payment buttons, warrior portrait

### Interactive Components
- **MeditationFog**: R3F Canvas with fullscreen ShaderMaterial plane, custom GLSL fog shader
- **WisdomConstellation**: Canvas 2D particle system (lines + particles + nodes), scroll-responsive
- **HumorGrid3D**: html2canvas rasterization + CustomShaderMaterial 3D planes with GSAP flip animation
- **EnsoCircle**: Canvas 2D procedural enso that draws on hover
- **BreathingCircle**: CSS keyframe animation (scale + opacity) for guided breathing
- **FlipCard**: CSS 3D transform card flip for BAM practice explanation

### Hooks
- **useWisdomConstellation**: Complete Canvas 2D animation loop, mouse/scroll listeners, node/line/particle state
- **useSmoothScroll**: Custom smooth scroll (NOT native CSS) providing instantaneous delta-Y to WisdomConstellation

## Animation Implementation

| Animation | Library | Implementation | Complexity |
|-----------|---------|---------------|------------|
| Meditation Fog (Hero bg) | Three.js + R3F + custom GLSL | ShaderMaterial with fbm/warped noise, mouse-reactive rotation | High |
| Wisdom Constellation particles | Canvas 2D (hook) | requestAnimationFrame loop, 150 particles + 80 lines, scroll-reactive velocity | High |
| Humor Card 3D Flip | GSAP + three-custom-shader-material | html2canvas rasterization, GSAP tween on uFlipProgress + Y-rotation | High |
| Enso Circle draw | Canvas 2D | Arc path animation on mouseenter | Medium |
| Breathing Circle | CSS keyframes | scale(0.8→1.2→0.8) + opacity pulse, 8s infinite | Low |
| Custom Cursor | CSS + JS | transform translate following mouse, scale transition on hover | Low |
| Liquid Glass cards | CSS | background rgba + box-shadow inset highlight + backdrop-filter | Low |
| Smooth Scroll | Custom hook | translateY on wrapper, velocity exposed to particle system | Medium |
| Card tilt (Wisdom quotes) | CSS transform | perspective + rotateX/Y based on mouse position | Low |
| Section entrance fades | GSAP ScrollTrigger | opacity 0→1 + translateY, triggered on scroll into view | Low |

## Key Implementation Notes

1. **MeditationFog** uses `position: fixed; inset: 0; z-index: -1` for hero. Activism section mounts a second instance scoped to its container.

2. **WisdomConstellation** runs in a `<canvas>` overlaid via CSS in its section. The hook owns the entire animation lifecycle and returns node state for React to overlay quote cards.

3. **HumorGrid3D** requires each card to be rendered in DOM first, captured via html2canvas, then used as a THREE.CanvasTexture. The flip animation tweens both the material uniform and mesh rotation simultaneously.

4. **LiquidGlass** treatment: `background: rgba(245, 243, 238, 0.1)`, `box-shadow: inset 0 1px 0 rgba(255,255,255,0.3)`, subtle `backdrop-filter` for refraction, NO heavy blur.

5. **Font loading**: Use @fontsource packages for Instrument Serif and Source Sans 3, import in main.tsx.

6. **Scroll behavior**: Native CSS `scroll-behavior: smooth` is DISABLED. The custom smooth scroll hook provides instantaneous delta-Y values needed by WisdomConstellation's scrollV calculation.

7. **Texture**: Rice paper texture is a static PNG with 2% opacity overlay via CSS `background-image` on the Healing section.
