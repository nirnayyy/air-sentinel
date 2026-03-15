import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

const SolarSystem = () => {
  const sunRef = useRef<THREE.Mesh>(null)
  const earthRef = useRef<THREE.Mesh>(null)
  const moonRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.01
    }
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005
      earthRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 3
      earthRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 3
    }
    if (moonRef.current && earthRef.current) {
      moonRef.current.position.x = earthRef.current.position.x + Math.cos(state.clock.elapsedTime * 2) * 0.5
      moonRef.current.position.z = earthRef.current.position.z + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#FF6B35" />
      
      {/* Sun */}
      <Sphere ref={sunRef} args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FF6B35" />
      </Sphere>
      
      {/* Earth */}
      <Sphere ref={earthRef} args={[0.3, 32, 32]}>
        <meshBasicMaterial color="#4A90E2" />
      </Sphere>
      
      {/* Moon */}
      <Sphere ref={moonRef} args={[0.1, 16, 16]}>
        <meshBasicMaterial color="#C0C0C0" />
      </Sphere>
      
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  )
}

export default SolarSystem

