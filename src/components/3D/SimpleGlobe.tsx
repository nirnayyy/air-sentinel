import React from 'react'
import HTMLGlobeAnimation from './HTMLGlobeAnimation'

// Simplified component that shows only the HTML globe animation
const SimpleGlobe: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* HTML Globe Animation */}
      <div className="absolute inset-0 z-0">
        <HTMLGlobeAnimation 
          className="w-full h-full"
          style={{ 
            background: 'transparent'
          }} 
        />
      </div>
    </div>
  )
}

export default SimpleGlobe
