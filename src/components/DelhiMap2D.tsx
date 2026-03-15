import React from 'react'
import { MapPin, Star } from 'lucide-react'

interface Site {
  id: number
  name: string
  latitude: number
  longitude: number
  aqi?: number
  category?: string
}

interface DelhiMap2DProps {
  sites: Site[]
  selectedSite: Site | null
  onSiteSelect: (site: Site) => void
}

const DelhiMap2D = ({ sites, selectedSite, onSiteSelect }: DelhiMap2DProps) => {
  // Delhi coordinates and boundaries
  const delhiBounds = {
    north: 28.9,
    south: 28.4,
    east: 77.4,
    west: 76.8
  }

  // Convert lat/lon to pixel coordinates within the map container
  const latLonToPixel = (lat: number, lon: number, containerWidth: number, containerHeight: number) => {
    const x = ((lon - delhiBounds.west) / (delhiBounds.east - delhiBounds.west)) * containerWidth
    const y = ((delhiBounds.north - lat) / (delhiBounds.north - delhiBounds.south)) * containerHeight
    return { x, y }
  }

  // Get AQI color based on value
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500'
    if (aqi <= 100) return 'bg-yellow-500'
    if (aqi <= 150) return 'bg-orange-500'
    if (aqi <= 200) return 'bg-red-500'
    if (aqi <= 300) return 'bg-purple-500'
    return 'bg-red-800'
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Space-themed background with stars */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        {/* Twinkling stars */}
        <div className="absolute top-4 left-8 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-12 right-12 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-80 animate-ping"></div>
        <div className="absolute top-20 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-8 right-1/3 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-16 left-3/4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-24 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-32 left-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-40 right-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50 animate-pulse"></div>
      </div>

      {/* Satellite view of Delhi with space theme */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Delhi satellite view - urban areas in dark theme */}
          <defs>
            <pattern id="satelliteTexture" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="#1a1a2e"/>
              <circle cx="10" cy="10" r="1" fill="#16213e" opacity="0.3"/>
            </pattern>
            <radialGradient id="delhiGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f3460" stopOpacity="0.8"/>
              <stop offset="30%" stopColor="#16213e" stopOpacity="0.6"/>
              <stop offset="70%" stopColor="#1a1a2e" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#0e0e23" stopOpacity="0.2"/>
            </radialGradient>
          </defs>
          
          {/* Delhi boundary with satellite view styling */}
          <path
            d="M50 50 L350 50 L350 250 L50 250 Z"
            fill="url(#delhiGradient)"
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth="1"
          />
          
          {/* Urban areas representation */}
          <rect x="80" y="80" width="60" height="40" fill="#2d3748" opacity="0.6" rx="2"/>
          <rect x="160" y="70" width="80" height="50" fill="#4a5568" opacity="0.7" rx="3"/>
          <rect x="260" y="90" width="70" height="35" fill="#2d3748" opacity="0.6" rx="2"/>
          <rect x="100" y="150" width="90" height="45" fill="#4a5568" opacity="0.7" rx="3"/>
          <rect x="210" y="160" width="75" height="40" fill="#2d3748" opacity="0.6" rx="2"/>
          <rect x="300" y="170" width="40" height="30" fill="#4a5568" opacity="0.7" rx="2"/>
          
          {/* Major roads with space theme */}
          <line x1="50" y1="150" x2="350" y2="150" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="3,3"/>
          <line x1="200" y1="50" x2="200" y2="250" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="3,3"/>
          <line x1="100" y1="100" x2="300" y2="200" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="2,2"/>
          <line x1="300" y1="100" x2="100" y2="200" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="2,2"/>
          
          {/* Water bodies (Yamuna River) */}
          <path d="M50 120 Q150 100 200 110 T350 125" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="3" fill="none"/>
          <path d="M50 125 Q150 105 200 115 T350 130" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none"/>
          
          {/* Grid overlay for satellite view */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3"/>
        </svg>
      </div>

      {/* Site markers with space theme */}
      {sites.map((site) => {
        const { x, y } = latLonToPixel(site.latitude, site.longitude, 400, 300)
        const isSelected = selectedSite?.id === site.id
        
        return (
          <div
            key={site.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={() => onSiteSelect(site)}
          >
            {/* Satellite-style marker with glow effect */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className={`
                absolute inset-0 rounded-full animate-ping
                ${site.aqi ? getAQIColor(site.aqi) : 'bg-blue-500'}
                opacity-30
                ${isSelected ? 'scale-200' : 'scale-100'}
              `}></div>
              
              {/* Main marker */}
              <div className={`
                relative w-5 h-5 rounded-full border-2 border-white shadow-2xl transition-all duration-300
                ${isSelected ? 'scale-150' : 'group-hover:scale-125'}
                ${site.aqi ? getAQIColor(site.aqi) : 'bg-blue-500'}
              `}>
                {/* Inner satellite dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-80"></div>
                {/* Scanning line effect */}
                <div className="absolute inset-0 rounded-full border border-white/30 animate-pulse"></div>
              </div>
              
              {/* Data transmission lines */}
              <div className="absolute -top-2 -left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -top-1 -right-2 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-2 -left-1 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
            </div>
            
            {/* Site label with space theme */}
            <div className={`
              absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap
              text-xs text-white bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-blue-400/30
              ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              transition-all duration-300 shadow-lg
            `}>
              <div className="flex items-center space-x-1 mb-1">
                <Star className="h-3 w-3 text-blue-400" />
                <span className="font-semibold">{site.name}</span>
              </div>
              {site.aqi && (
                <div className="text-xs text-gray-300 flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getAQIColor(site.aqi).replace('bg-', 'bg-')}`}></div>
                  <span>AQI: {site.aqi}</span>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* Space-themed Legend */}
      <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 text-xs border border-blue-400/30 shadow-2xl">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-white font-semibold text-sm">Satellite Air Quality Index</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-4 h-4 bg-green-500 rounded-full border border-white/30"></div>
              <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-30"></div>
            </div>
            <span className="text-gray-300">Good (0-50)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-4 h-4 bg-yellow-500 rounded-full border border-white/30"></div>
              <div className="absolute inset-0 w-4 h-4 bg-yellow-500 rounded-full animate-ping opacity-30"></div>
            </div>
            <span className="text-gray-300">Moderate (51-100)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-4 h-4 bg-orange-500 rounded-full border border-white/30"></div>
              <div className="absolute inset-0 w-4 h-4 bg-orange-500 rounded-full animate-ping opacity-30"></div>
            </div>
            <span className="text-gray-300">Unhealthy (101-150)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-4 h-4 bg-red-500 rounded-full border border-white/30"></div>
              <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-30"></div>
            </div>
            <span className="text-gray-300">Very Unhealthy (151-200)</span>
          </div>
        </div>
      </div>

      {/* Satellite Map title */}
      <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-blue-400/30 shadow-2xl">
        <div className="flex items-center space-x-2 text-white">
          <div className="relative">
            <MapPin className="h-5 w-5 text-blue-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
          </div>
          <div>
            <div className="text-sm font-semibold">Delhi Satellite View</div>
            <div className="text-xs text-blue-300">Air Quality Monitoring Network</div>
          </div>
        </div>
      </div>

      {/* Satellite scanning lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Satellite data transmission indicators */}
      <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-400/30">
        <div className="flex items-center space-x-2 text-xs text-blue-300">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>LIVE DATA</span>
        </div>
      </div>

      {/* Coordinates display */}
      <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-400/30 text-xs text-gray-300">
        <div>28.6139°N, 77.2090°E</div>
        <div className="text-blue-300">Delhi, India</div>
      </div>
    </div>
  )
}

export default DelhiMap2D
