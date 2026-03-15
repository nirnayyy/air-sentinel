import React from 'react'

interface ShootingStarsProps {
  count?: number
  speed?: number
  size?: number
}

const ShootingStars: React.FC<ShootingStarsProps> = ({ 
  count = 3, 
  speed = 2, 
  size = 2 
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-shooting-star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${speed}s`,
          }}
        />
      ))}
    </div>
  )
}

export default ShootingStars

