import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function TechOrbit3D({
  icon: Icon,
  label,
  radius = 2.4,
  speed = 0.35,
  size = 0.15,
  angleOffset = 0,
  color = '#67e8f9',
}) {
  const groupRef = useRef(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angleOffset
    if (!groupRef.current) return
    groupRef.current.position.x = Math.cos(t) * radius
    groupRef.current.position.z = Math.sin(t) * radius
    groupRef.current.position.y = Math.sin(t * 1.3) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Punto lumínico */}
      <mesh>
        <sphereGeometry args={[size, 20, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>

      <Html transform center distanceFactor={4.5} sprite>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            userSelect: 'none',
          }}
          title={label}
        >
          {/* Ícono */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '56px',
              width: '56px',
              borderRadius: '50%',
              border: `2px solid ${color}70`,
              background: 'rgba(2,6,23,0.92)',
              boxShadow: `0 0 20px ${color}60, 0 0 40px ${color}25, inset 0 0 10px ${color}15`,
              color: color,
              fontSize: '26px',
            }}
          >
            <Icon />
          </div>
          {/* Etiqueta */}
          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              color: color,
              textShadow: `0 0 10px ${color}`,
              background: 'rgba(2,6,23,0.80)',
              padding: '2px 8px',
              borderRadius: '6px',
              border: `1px solid ${color}30`,
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        </div>
      </Html>
    </group>
  )
}

export default TechOrbit3D
