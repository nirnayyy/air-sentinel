import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Layers, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2 } from 'lucide-react'

interface MapMarker {
  id: number
  name: string
  latitude: number
  longitude: number
  aqi: number
  category: string
  color: string
  lastUpdated: string
}

interface DelhiMap3DProps {
  markers?: MapMarker[]
  onMarkerClick?: (marker: MapMarker) => void
  selectedMarker?: MapMarker | null
  height?: string
}

const DelhiMap3D: React.FC<DelhiMap3DProps> = ({ 
  markers = [], 
  onMarkerClick, 
  selectedMarker,
  height = "500px"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [hoveredMarker, setHoveredMarker] = useState<MapMarker | null>(null)

  // Delhi coordinates and sample monitoring sites
  const delhiCenter = { lat: 28.6139, lng: 77.2090 }
  const defaultMarkers: MapMarker[] = [
    {
      id: 1,
      name: "ITO - Central Delhi",
      latitude: 28.6139,
      longitude: 77.2090,
      aqi: 156,
      category: "Unhealthy",
      color: "#EF4444",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 2,
      name: "RK Puram - South Delhi",
      latitude: 28.5355,
      longitude: 77.1910,
      aqi: 142,
      category: "Unhealthy for Sensitive",
      color: "#F59E0B",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 3,
      name: "Anand Vihar - East Delhi",
      latitude: 28.6304,
      longitude: 77.3177,
      aqi: 178,
      category: "Unhealthy",
      color: "#EF4444",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 4,
      name: "Punjabi Bagh - West Delhi",
      latitude: 28.6562,
      longitude: 77.1410,
      aqi: 134,
      category: "Unhealthy for Sensitive",
      color: "#F59E0B",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 5,
      name: "Civil Lines - North Delhi",
      latitude: 28.7041,
      longitude: 77.2025,
      aqi: 98,
      category: "Moderate",
      color: "#FCD34D",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 6,
      name: "Gurgaon - Haryana",
      latitude: 28.4595,
      longitude: 77.0266,
      aqi: 165,
      category: "Unhealthy",
      color: "#EF4444",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 7,
      name: "Noida - Uttar Pradesh",
      latitude: 28.5355,
      longitude: 77.3910,
      aqi: 152,
      category: "Unhealthy",
      color: "#EF4444",
      lastUpdated: new Date().toISOString()
    }
  ]

  const displayMarkers = markers.length > 0 ? markers : defaultMarkers

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Draw 3D map
    const drawMap = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)
      
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio
      const centerX = width / 2
      const centerY = height / 2

      // Draw base map (simplified Delhi outline)
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.scale(zoom, zoom)
      ctx.rotate(rotation)

      // Draw Delhi boundary (simplified)
      ctx.strokeStyle = '#3B82F6'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(0, 0, 150, 120, 0, 0, 2 * Math.PI)
      ctx.stroke()

      // Draw grid lines for 3D effect
      ctx.strokeStyle = '#374151'
      ctx.lineWidth = 1
      for (let i = -150; i <= 150; i += 30) {
        ctx.beginPath()
        ctx.moveTo(i, -120)
        ctx.lineTo(i, 120)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(-150, i)
        ctx.lineTo(150, i)
        ctx.stroke()
      }

      // Draw markers
      displayMarkers.forEach(marker => {
        const x = (marker.longitude - delhiCenter.lng) * 1000
        const y = (marker.latitude - delhiCenter.lat) * 1000

        // Marker shadow (3D effect)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.beginPath()
        ctx.ellipse(x + 2, y + 2, 8, 8, 0, 0, 2 * Math.PI)
        ctx.fill()

        // Marker circle
        ctx.fillStyle = marker.color
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.ellipse(x, y, 8, 8, 0, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()

        // Marker pulse effect for selected/hovered
        if (selectedMarker?.id === marker.id || hoveredMarker?.id === marker.id) {
          ctx.strokeStyle = marker.color
          ctx.lineWidth = 3
          ctx.globalAlpha = 0.6
          for (let i = 1; i <= 3; i++) {
            ctx.beginPath()
            ctx.ellipse(x, y, 8 + i * 4, 8 + i * 4, 0, 0, 2 * Math.PI)
            ctx.stroke()
          }
          ctx.globalAlpha = 1
        }

        // AQI value text
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 10px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(marker.aqi.toString(), x, y + 3)
      })

      ctx.restore()
    }

    drawMap()

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      // Check if mouse is over a marker
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      let foundMarker = null
      displayMarkers.forEach(marker => {
        const x = centerX + (marker.longitude - delhiCenter.lng) * 1000 * zoom
        const y = centerY + (marker.latitude - delhiCenter.lat) * 1000 * zoom
        
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
        if (distance < 15) {
          foundMarker = marker
        }
      })
      
      setHoveredMarker(foundMarker)
      canvas.style.cursor = foundMarker ? 'pointer' : 'default'
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      displayMarkers.forEach(marker => {
        const x = centerX + (marker.longitude - delhiCenter.lng) * 1000 * zoom
        const y = centerY + (marker.latitude - delhiCenter.lat) * 1000 * zoom
        
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
        if (distance < 15 && onMarkerClick) {
          onMarkerClick(marker)
        }
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
    }
  }, [displayMarkers, selectedMarker, hoveredMarker, zoom, rotation, onMarkerClick])

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5))
  const handleRotate = () => setRotation(prev => prev + Math.PI / 4)
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-lg transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-lg transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={handleRotate}
          className="p-2 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-lg transition-colors"
          title="Rotate"
        >
          <RotateCw className="h-4 w-4" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-lg transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Map Info */}
      <div className="absolute top-4 right-4 z-10 bg-gray-800/80 text-white p-3 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium">Delhi Air Quality Map</span>
        </div>
        <div className="text-xs text-gray-300">
          {displayMarkers.length} monitoring sites
        </div>
        <div className="text-xs text-gray-300">
          Zoom: {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ height: isFullscreen ? '100vh' : height }}
      />

      {/* Marker Tooltip */}
      {hoveredMarker && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 z-10 bg-gray-800/90 text-white p-3 rounded-lg min-w-[200px]"
        >
          <div className="flex items-center space-x-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: hoveredMarker.color }}
            ></div>
            <span className="font-medium">{hoveredMarker.name}</span>
          </div>
          <div className="text-sm text-gray-300">
            AQI: <span className="text-white font-medium">{hoveredMarker.aqi}</span>
          </div>
          <div className="text-sm text-gray-300">
            Category: <span className="text-white">{hoveredMarker.category}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Updated: {new Date(hoveredMarker.lastUpdated).toLocaleTimeString()}
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10 bg-gray-800/80 text-white p-3 rounded-lg">
        <div className="text-sm font-medium mb-2">AQI Categories</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Unhealthy for Sensitive (101-150)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Unhealthy (151-200)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DelhiMap3D

