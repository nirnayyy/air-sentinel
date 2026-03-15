import React, { useEffect, useRef, useState } from 'react'

interface HTMLGlobeAnimationProps {
  className?: string
  style?: React.CSSProperties
}

const HTMLGlobeAnimation: React.FC<HTMLGlobeAnimationProps> = ({ 
  className = '', 
  style = {} 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create an iframe to load the HTML globe animation
    const iframe = document.createElement('iframe')
    iframe.src = '/globe-animation.html'
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.style.border = 'none'
    iframe.style.background = 'transparent'
    iframe.style.position = 'absolute'
    iframe.style.top = '0'
    iframe.style.left = '0'
    
    // Make the iframe background transparent
    iframe.setAttribute('allowtransparency', 'true')
    
    // Handle loading state
    iframe.onload = () => {
      setIsLoaded(true)
    }
    
    iframe.onerror = () => {
      console.error('Failed to load globe animation, using fallback')
      setUseFallback(true)
      setIsLoaded(true)
    }
    
    // Set a timeout to fallback if loading takes too long
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Globe animation loading timeout, using fallback')
        setUseFallback(true)
        setIsLoaded(true)
      }
    }, 5000)
    
    container.appendChild(iframe)

    // Cleanup function
    return () => {
      clearTimeout(timeout)
      if (container.contains(iframe)) {
        container.removeChild(iframe)
      }
    }
  }, [isLoaded])

  // Fallback globe animation using CSS
  const FallbackGlobe = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Main Earth Globe */}
        <div 
          className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-green-600 animate-spin"
          style={{
            animationDuration: '20s',
            backgroundImage: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
              linear-gradient(45deg, #1e40af 0%, #3b82f6 25%, #10b981 50%, #059669 75%, #1e40af 100%)
            `,
            boxShadow: '0 0 50px rgba(59, 130, 246, 0.5), inset 0 0 50px rgba(255,255,255,0.1)'
          }}
        />
        
        {/* Atmosphere layers */}
        <div 
          className="absolute inset-0 w-48 h-48 rounded-full opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(135, 206, 235, 0.3) 0%, transparent 70%)',
            animationDuration: '3s'
          }}
        />
        
        <div 
          className="absolute inset-0 w-48 h-48 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(135, 206, 235, 0.2) 0%, transparent 60%)',
            transform: 'scale(1.1)'
          }}
        />
      </div>
    </div>
  )

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{
        background: 'transparent',
        minHeight: '500px', // Ensure minimum height
        overflow: 'visible', // Allow shadow to extend
        ...style
      }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-sm">Loading Globe Animation...</div>
        </div>
      )}
      
      {useFallback && isLoaded && <FallbackGlobe />}
    </div>
  )
}

export default HTMLGlobeAnimation
