import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ORB_COUNT = 220

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453123
  return x - Math.floor(x)
}

function CameraRig({ mouseRef }) {
  useFrame(({ camera }) => {
    const targetX = mouseRef.current.x * 0.55
    const targetY = mouseRef.current.y * 0.26

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function OrbCluster({ mouseRef }) {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const helper = useMemo(() => new THREE.Object3D(), [])

  const orbs = useMemo(() => {
    const list = []

    for (let i = 0; i < ORB_COUNT; i += 1) {
      const k = i + 0.5
      const phi = Math.acos(1 - (2 * k) / ORB_COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * k
      const jitterA = pseudoRandom(i + 11)
      const jitterB = pseudoRandom(i + 29)
      const radius = 1.92 + (jitterA - 0.5) * 0.34

      const x = Math.cos(theta) * Math.sin(phi) * radius
      const y = Math.cos(phi) * radius
      const z = Math.sin(theta) * Math.sin(phi) * radius
      const scale = 0.105 + jitterB * 0.06

      // Accent band near center gives the neon stripe effect.
      const centerBand = Math.exp(-Math.pow(x * 1.3, 2))
      const cyanWeight = Math.max(0, 0.42 + z * 0.2)
      const color = new THREE.Color('#f8fafc')
      color.lerp(new THREE.Color('#a3e635'), centerBand * 0.65)
      color.lerp(new THREE.Color('#67e8f9'), cyanWeight * 0.45)

      list.push({ x, y, z, scale, color })
    }

    return list
  }, [])

  useEffect(() => {
    if (!meshRef.current) return

    orbs.forEach((orb, index) => {
      helper.position.set(orb.x, orb.y, orb.z)
      helper.scale.setScalar(orb.scale)
      helper.updateMatrix()

      meshRef.current.setMatrixAt(index, helper.matrix)
      meshRef.current.setColorAt(index, orb.color)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [helper, orbs])

  const timeRef = useRef(0)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    timeRef.current += delta
    const time = timeRef.current
    const targetY = mouseRef.current.x * 0.55 + Math.sin(time * 0.3) * 0.1
    const targetX = mouseRef.current.y * 0.3

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.045)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.045)
    groupRef.current.rotation.z += delta * 0.1
  })

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, ORB_COUNT]}>
        <sphereGeometry args={[1, 18, 18]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.18}
          vertexColors
        />
      </instancedMesh>
    </group>
  )
}

export default function OrbFieldBackground() {
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1
      mouseRef.current.x = x
      mouseRef.current.y = -y
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 42 }}
      >
        <ambientLight intensity={0.52} />
        <directionalLight position={[3, 2, 4]} intensity={1.3} color="#67e8f9" />
        <directionalLight position={[-3, -2, -4]} intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 0, 3]} intensity={0.65} color="#a3e635" />

        <CameraRig mouseRef={mouseRef} />
        <OrbCluster mouseRef={mouseRef} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-50/95 via-slate-100/88 to-cyan-50/78 dark:from-[#020617]/64 dark:via-[#020617]/74 dark:to-[#020617]/84" />
      <div className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_top,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.15)_52%,transparent_75%] opacity-90 dark:opacity-0" />
    </div>
  )
}
