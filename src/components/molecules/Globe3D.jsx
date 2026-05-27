import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Church locations data
export const churchLocations = [
  {
    id: 'villa-mercedes',
    name: 'Casa del Alfarero - Villa Mercedes',
    city: 'Villa Mercedes, Argentina',
    lat: -33.68,
    lon: -65.46,
    details: 'Sede central del ministerio. Una iglesia comprometida con impactar la ciudad de Villa Mercedes y extender el Reino de Dios.'
  },
  {
    id: 'madrid',
    name: 'Casa del Alfarero - Madrid',
    city: 'Madrid, España',
    lat: 40.4167,
    lon: -3.7037,
    details: 'Llevando la palabra y el amor de Dios en el corazón de España, sirviendo a la comunidad hispana y local.'
  },
  {
    id: 'miami',
    name: 'Casa del Alfarero - Miami',
    city: 'Miami, EE. UU.',
    lat: 27.6617,
    lon: -81.5118,
    details: 'Un faro de fe y comunidad para familias y jóvenes en el sur de la Florida.'
  },
  {
    id: 'mexico',
    name: 'Casa del Alfarero - Ciudad de México',
    city: 'Ciudad de México, México',
    lat: 23.6345,
    lon: -102.5528,
    details: 'Reuniendo y restaurando vidas a través del evangelio en una de las urbes más grandes del mundo.'
  },
  {
    id: 'roma',
    name: 'Casa del Alfarero - Roma',
    city: 'Roma, Italia',
    lat: 41.9028,
    lon: 12.4964,
    details: 'Estableciendo comunidad y compañerismo cristiano en la histórica ciudad europea.'
  }
]

// Convert Lat/Lon to 3D Cartesian Coordinates matching Three.js native SphereGeometry vertex generation
const convertLatLonToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180) // polar angle (0 to PI)
  const theta = (lon + 180) * (Math.PI / 180) // azimuthal angle (0 to 2PI)

  // Three.js native UV wrapping coordinates
  const x = -(radius * Math.cos(theta) * Math.sin(phi))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(theta) * Math.sin(phi)

  return new THREE.Vector3(x, y, z)
}

// Subcomponent rendering the Globe Mesh and points
const GlobeMesh = ({ selectedLocation, onMarkerClick, autoRotate }) => {
  const globeRef = useRef()
  const radius = 2

  // Load realistic Earth satellite texture
  const texture = useTexture('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')

  // Animate the rotation and target locking
  useFrame((state, delta) => {
    if (!globeRef.current) return

    if (selectedLocation) {
      // Rotate the globe so the selected location faces the camera
      // Positive Z (theta = PI/2) faces the camera, so: targetY = PI/2 - theta
      const targetY = - (selectedLocation.lon * Math.PI / 180) - (Math.PI / 2)
      const targetX = (selectedLocation.lat * Math.PI / 180)
      
      globeRef.current.rotation.y = THREE.MathUtils.lerp(globeRef.current.rotation.y, targetY, 0.05)
      globeRef.current.rotation.x = THREE.MathUtils.lerp(globeRef.current.rotation.x, targetX, 0.05)
    } else if (autoRotate) {
      // Auto rotate slowly
      globeRef.current.rotation.y += 0.002
    }
  })

  // Pulsing scale for red points
  const pulseRef = useRef([])
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const pulseFactor = 1 + Math.sin(time * 6) * 0.25
    pulseRef.current.forEach((mesh) => {
      if (mesh) {
        mesh.scale.set(pulseFactor, pulseFactor, pulseFactor)
      }
    })
  })

  return (
    <group ref={globeRef}>
      {/* Base Earth Sphere with realistic standard texture and shading */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>

      {/* Grid sphere lines for 3D depth and futuristic high-end look overlay */}
      <mesh>
        <sphereGeometry args={[radius + 0.005, 30, 30]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Church Marker points */}
      {churchLocations.map((loc, idx) => {
        const position = convertLatLonToVector3(loc.lat, loc.lon, radius + 0.02)
        const isSelected = selectedLocation?.id === loc.id
        return (
          <group key={loc.id} position={position}>
            {/* Center solid dot */}
            <mesh onClick={(e) => { e.stopPropagation(); onMarkerClick(loc); }}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color={isSelected ? '#ef4444' : '#ff0000'} />
            </mesh>

            {/* Pulsing outer ring */}
            <mesh 
              ref={(el) => (pulseRef.current[idx] = el)} 
              onClick={(e) => { e.stopPropagation(); onMarkerClick(loc); }}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial 
                color="#ef4444" 
                transparent 
                opacity={isSelected ? 0.6 : 0.3} 
                wireframe
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

const Globe3D = ({ selectedLocation, onLocationSelect }) => {
  const [autoRotate, setAutoRotate] = useState(true)

  // Pause auto-rotation when user interacts or selects a location
  useEffect(() => {
    if (selectedLocation) {
      setAutoRotate(false)
    } else {
      setAutoRotate(true)
    }
  }, [selectedLocation])

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <GlobeMesh 
            selectedLocation={selectedLocation} 
            onMarkerClick={onLocationSelect}
            autoRotate={autoRotate}
          />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3 / 4}
          onStart={() => setAutoRotate(false)}
        />
      </Canvas>
    </div>
  )
}

export default Globe3D
