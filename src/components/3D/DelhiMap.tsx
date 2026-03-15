import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

interface Site {
  id: number
  name: string
  latitude: number
  longitude: number
}

interface DelhiMapProps {
  sites: Site[]
  selectedSite: Site | null
  onSiteSelect: (site: Site) => void
}

const DelhiMap = ({ sites, selectedSite, onSiteSelect }: DelhiMapProps) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  // Convert lat/lon to 3D coordinates (simplified projection)
  const latLonTo3D = (lat: number, lon: number, radius: number = 2) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 90) * (Math.PI / 180)
    
    return {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    }
  }

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
      
      {/* Delhi Globe */}
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#2D5A27" 
          transparent 
          opacity={0.8}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>

      {/* Site Markers */}
      <group ref={groupRef}>
        {sites.map((site) => {
          const position = latLonTo3D(site.latitude, site.longitude, 2.1)
          const isSelected = selectedSite?.id === site.id
          
          return (
            <group key={site.id} position={[position.x, position.y, position.z]}>
              {/* Site Pin */}
              <Sphere 
                args={[0.05, 16, 16]} 
                onClick={() => onSiteSelect(site)}
                onPointerOver={(e) => {
                  e.stopPropagation()
                  document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'auto'
                }}
              >
                <meshStandardMaterial 
                  color={isSelected ? "#FF6B35" : "#FFD700"}
                  emissive={isSelected ? "#FF6B35" : "#FFD700"}
                  emissiveIntensity={0.3}
                />
              </Sphere>
              
              {/* Site Label */}
              <Text
                position={[0, 0.15, 0]}
                fontSize={0.08}
                color={isSelected ? "#FF6B35" : "#FFFFFF"}
                anchorX="center"
                anchorY="middle"
                billboard
              >
                {site.name}
              </Text>
              
              {/* Connection Line to Ground */}
              <mesh>
                <cylinderGeometry args={[0.01, 0.01, 0.1]} />
                <meshStandardMaterial 
                  color={isSelected ? "#FF6B35" : "#FFD700"}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            </group>
          )
        })}
      </group>

      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        minDistance={3}
        maxDistance={8}
      />
    </>
  )
}

export default DelhiMap

