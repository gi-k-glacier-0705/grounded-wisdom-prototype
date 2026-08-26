import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import fogVertexShader from '../shaders/fogVertex.glsl?raw'
import fogFragmentShader from '../shaders/fogFragment.glsl?raw'

function FogPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5))
  const mouseCurrent = useRef(new THREE.Vector2(0.5, 0.5))

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_color1: { value: new THREE.Color('#78866B') },
      u_color2: { value: new THREE.Color('#3A4A3F') },
      u_color3: { value: new THREE.Color('#E8E4DE') },
    }),
    []
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      )
    }
    const handleResize = () => {
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [uniforms])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime
      mouseCurrent.current.lerp(mouseTarget.current, 0.05)
      materialRef.current.uniforms.u_mouse.value.set(
        mouseCurrent.current.x,
        mouseCurrent.current.y
      )
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={fogVertexShader}
        fragmentShader={fogFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

interface MeditationFogProps {
  className?: string
  style?: React.CSSProperties
}

export default function MeditationFog({ className = '', style = {} }: MeditationFogProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    const container = document.getElementById('fog-container')
    if (container) observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      id="fog-container"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        ...style,
      }}
    >
      {isVisible && (
        <Canvas
          orthographic
          camera={{ zoom: 1, position: [0, 0, 1] }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: false, alpha: false }}
          dpr={Math.min(window.devicePixelRatio, 1.5)}
        >
          <FogPlane />
        </Canvas>
      )}
    </div>
  )
}
