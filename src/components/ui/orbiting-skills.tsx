"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type PollutantType = 'no2' | 'o3' | 'pm25' | 'pm10' | 'co' | 'so2';

type GlowColor = 'cyan' | 'purple';

interface PollutantIconProps {
  type: PollutantType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  pollutantType: PollutantType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Pollutant Components ---
const pollutantComponents: Record<PollutantType, { component: () => React.JSX.Element; color: string }> = {
  no2: {
    component: () => (
      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
        NO₂
      </div>
    ),
    color: '#FF6B6B'
  },
  o3: {
    component: () => (
      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
        O₃
      </div>
    ),
    color: '#4ECDC4'
  },
  pm25: {
    component: () => (
      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
        PM2.5
      </div>
    ),
    color: '#45B7D1'
  },
  pm10: {
    component: () => (
      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
        PM10
      </div>
    ),
    color: '#96CEB4'
  },
  co: {
    component: () => (
      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
        CO
      </div>
    ),
    color: '#FFEAA7'
  },
  so2: {
    component: () => (
      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
        SO₂
      </div>
    ),
    color: '#DDA0DD'
  }
};

// --- Memoized Pollutant Component ---
const PollutantIcon = memo(({ type }: PollutantIconProps) => {
  const PollutantComponent = pollutantComponents[type]?.component;
  return PollutantComponent ? <PollutantComponent /> : null;
});
PollutantIcon.displayName = 'PollutantIcon';

// --- Configuration for the Orbiting Pollutants ---
const pollutantsConfig: SkillConfig[] = [
  // Inner Orbit
  { 
    id: 'no2',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    pollutantType: 'no2', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'Nitrogen Dioxide'
  },
  { 
    id: 'o3',
    orbitRadius: 100, 
    size: 45, 
    speed: 1, 
    pollutantType: 'o3', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'Ozone'
  },
  { 
    id: 'pm25',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    pollutantType: 'pm25', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'PM2.5 Particles'
  },
  // Outer Orbit
  { 
    id: 'pm10',
    orbitRadius: 180, 
    size: 50, 
    speed: -0.6, 
    pollutantType: 'pm10', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'PM10 Particles'
  },
  { 
    id: 'co',
    orbitRadius: 180, 
    size: 45, 
    speed: -0.6, 
    pollutantType: 'co', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'Carbon Monoxide'
  },
  { 
    id: 'so2',
    orbitRadius: 180, 
    size: 40, 
    speed: -0.6, 
    pollutantType: 'so2', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'Sulfur Dioxide'
  },
];

// --- Memoized Orbiting Pollutant Component ---
const OrbitingPollutant = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, pollutantType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-800/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${pollutantComponents[pollutantType]?.color}40, 0 0 60px ${pollutantComponents[pollutantType]?.color}20`
            : undefined
        }}
      >
        <PollutantIcon type={pollutantType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingPollutant.displayName = 'OrbitingPollutant';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
      border: 'rgba(147, 51, 234, 0.3)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 180, glowColor: 'purple', delay: 1.5 }
  ];

  return (
    <main className="w-full flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #374151 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #4B5563 0%, transparent 50%)`,
          }}
        />
      </div>

      <div 
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[450px] md:h-[450px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central Air Pollutant Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#pollutant-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="pollutant-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting pollutant icons */}
        {pollutantsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingPollutant
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </main>
  );
}
