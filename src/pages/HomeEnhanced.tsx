import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BarChart3, MapPin, Satellite, Zap, Globe, Shield } from 'lucide-react'
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero'
import { useNavbar } from '../contexts/NavbarContext'
import SimpleGlobe from '../components/3D/SimpleGlobe'
import LightRays from '../components/LightRays'
import { ShootingStars } from '../components/ui/shooting-stars'
import { SparklesCore } from '../components/ui/sparkles'
import { Meteors } from '../components/ui/meteors'
import { Typewriter } from '../components/ui/typewriter-text'
import { GradientButton } from '../components/ui/gradient-button'
import OrbitingSkills from '../components/ui/orbiting-skills'
import { StarsBackground } from '../components/ui/stars-background'
import { ContainerScroll } from '../components/ui/container-scroll-animation'
import { CanvasRevealEffect } from '../components/ui/canvas-reveal-effect'
import { FallingPattern } from '../components/ui/falling-pattern'

const HomeEnhanced = () => {
  const { showNavbar } = useNavbar();
  
  const features = [
    {
      icon: BarChart3,
      title: 'AI-Powered Forecasting',
      description: 'Advanced XGBoost models predict 24-hour air quality with high accuracy'
    },
    {
      icon: Satellite,
      title: 'Satellite Data',
      description: 'Leveraging space technology for ground-level air quality monitoring'
    },
    {
      icon: MapPin,
      title: '7 Monitoring Sites',
      description: 'Comprehensive coverage across Delhi NCR region'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant data processing and prediction generation'
    },
    {
      icon: Globe,
      title: '3D Visualizations',
      description: 'Interactive 3D maps and space-themed visualizations'
    },
    {
      icon: Shield,
      title: 'Environmental Impact',
      description: 'Helping Delhi breathe cleaner air through technology'
    }
  ]

  // Media content for the scroll expansion hero
  const heroMediaContent = {
    video: {
      src: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1920&auto=format&fit=crop',
      poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop',
      background: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop',
      title: 'Air Sentinel',
      date: 'ISRO Satellite Technology',
      scrollToExpand: 'Scroll to Explore Our Technology',
    },
    image: {
      src: '/second.png',
      background: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1920&auto=format&fit=crop',
      title: 'Air Sentinel',
      date: 'For Clean Air Solutions',
      scrollToExpand: 'Scroll to Discover More',
    }
  }

  const HeroContent = () => (
    <div className='max-w-4xl mx-auto text-center'>
      <h2 className='text-3xl font-bold mb-6 text-white'>
        Welcome to Air Sentinel
      </h2>
      <p className='text-lg mb-8 text-white/80'>
        ISRO's revolutionary air quality forecasting system combines satellite technology with cutting-edge machine learning 
        to predict Delhi's air quality 24 hours ahead. Experience the future of environmental monitoring where space meets 
        ground-level air quality prediction.
      </p>
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* NEW: Scroll Expansion Hero Section */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={heroMediaContent.image.src}
        bgImageSrc={heroMediaContent.image.background}
        title={heroMediaContent.image.title}
        date={heroMediaContent.image.date}
        scrollToExpand={heroMediaContent.image.scrollToExpand}
        textBlend={false}
        onScrollPastContent={showNavbar}
      >
        <HeroContent />
      </ScrollExpandMedia>

      {/* EXISTING: Original Hero Section (now as secondary content) */}
      <section className="relative overflow-hidden">
        {/* Main Background */}
        <div className="absolute inset-0" style={{ background: '#000000' }}></div>
        
        {/* Twinkling Stars Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <StarsBackground
            starDensity={0.00024}
            allStarsTwinkle={true}
            twinkleProbability={0.8}
            minTwinkleSpeed={0.1}
            maxTwinkleSpeed={0.5}
          />
        </div>

        {/* Globe Fading Light Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[400px] rounded-full opacity-20 animate-pulse"
               style={{
                 background: 'radial-gradient(circle, rgba(135, 206, 235, 0.25) 0%, rgba(59, 130, 246, 0.12) 50%, rgba(147, 51, 234, 0.06) 75%, transparent 100%)',
                 animation: 'glow 5s ease-in-out infinite alternate'
               }}>
          </div>
        </div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        

        {/* Shooting Stars Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <ShootingStars
            starColor="#60a5fa"
            trailColor="#3b82f6"
            minSpeed={8}
            maxSpeed={20}
            minDelay={2000}
            maxDelay={5000}
            starWidth={8}
            starHeight={1}
          />
          <ShootingStars
            starColor="#a78bfa"
            trailColor="#8b5cf6"
            minSpeed={12}
            maxSpeed={25}
            minDelay={3000}
            maxDelay={6000}
            starWidth={6}
            starHeight={1}
          />
          <ShootingStars
            starColor="#34d399"
            trailColor="#10b981"
            minSpeed={6}
            maxSpeed={18}
            minDelay={2500}
            maxDelay={5500}
            starWidth={10}
            starHeight={1}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12" style={{ zIndex: 30 }}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-50"
            >
              {/* Air Sentinel Title and Effect Container */}
              <div className="w-full max-w-[40rem] relative mb-2 mx-auto">
                {/* Air Sentinel Title */}
                <h1 className="text-5xl lg:text-7xl font-bold text-white text-left mb-0">
                  <Typewriter
                    text="Advanced Analytics"
                    speed={150}
                    cursor="|"
                    loop={false}
                    hideCursorOnComplete={true}
                    className="text-white"
                  />
                </h1>
                
              </div>
              
              <p className="text-xl text-white mb-6 leading-relaxed">
                Deep insights into Delhi's air quality patterns using satellite data
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-50">
                <GradientButton asChild className="relative z-50">
                  <Link to="/forecast" className="inline-flex items-center justify-center relative z-50">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Start Forecasting
                  </Link>
                </GradientButton>
                <GradientButton asChild variant="variant" className="relative z-50">
                  <Link to="/sites" className="inline-flex items-center justify-center relative z-50">
                    <MapPin className="h-5 w-5 mr-2" />
                    Explore Sites
                  </Link>
                </GradientButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-[400px] lg:h-[500px]">
                <SimpleGlobe />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 pb-0 -mb-32 relative">
        {/* Main Background */}
        <div className="absolute inset-0" style={{ background: '#000000' }}></div>
        
        {/* Twinkling Stars Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <StarsBackground
            starDensity={0.00024}
            allStarsTwinkle={true}
            twinkleProbability={0.7}
            minTwinkleSpeed={0.1}
            maxTwinkleSpeed={0.5}
          />
        </div>

        {/* Background Light Rays */}
        <div className="absolute inset-0 opacity-30">
          <LightRays
            raysOrigin="bottom-left"
            raysColor="#3b82f6"
            raysSpeed={0.8}
            lightSpread={1.2}
            rayLength={0.8}
            followMouse={false}
            noiseAmount={0.05}
            distortion={0.02}
            className="features-rays"
          />
        </div>

        {/* Multiple Shooting Stars Layers for Features Section */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <ShootingStars
            starColor="#60a5fa"
            trailColor="#3b82f6"
            minSpeed={8}
            maxSpeed={20}
            minDelay={2000}
            maxDelay={5000}
            starWidth={8}
            starHeight={1}
          />
          <ShootingStars
            starColor="#9E00FF"
            trailColor="#2EB9DF"
            minSpeed={12}
            maxSpeed={25}
            minDelay={3000}
            maxDelay={6000}
            starWidth={6}
            starHeight={1}
          />
          <ShootingStars
            starColor="#FF0099"
            trailColor="#FFB800"
            minSpeed={6}
            maxSpeed={18}
            minDelay={4000}
            maxDelay={7000}
            starWidth={10}
            starHeight={1}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Space Technology for
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {' '}Clean Air
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Combining satellite capabilities with cutting-edge machine learning 
              to provide accurate air quality forecasts for Delhi.
            </p>
          </motion.div>

          {/* New Layout: Left Half - Orbiting Skills, Right Half - 2 Rows of 3 Cards Each */}
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start max-w-7xl mx-auto">
            {/* Left Half - Orbiting Skills */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center lg:justify-start lg:-ml-16 items-center"
            >
              <div className="w-[400px] h-[400px] relative -z-10">
                <OrbitingSkills />
              </div>
              <h3 className="text-2xl font-bold text-white mt-6 text-center">
                Major Air Pollutants
              </h3>
            </motion.div>

            {/* Right Half - 2 Rows of 3 Cards Each */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full"
            >
              {/* First Row - 3 Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {features.slice(0, 3).map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="card group hover:scale-105 transition-transform duration-300 relative overflow-hidden aspect-[4/5] p-12"
                    >
                      {/* Meteor Effect */}
                      <Meteors number={15} />
                      
                      <div className="flex flex-col h-full relative z-10">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                            <Icon className="h-6 w-6 text-blue-500" />
                          </div>
                        </div>
                        <div className="text-center flex-1 flex flex-col justify-center">
                          <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                          <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Second Row - 3 Cards */}
              <div className="grid grid-cols-3 gap-4">
                {features.slice(3, 6).map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={index + 3}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                      viewport={{ once: true }}
                      className="card group hover:scale-105 transition-transform duration-300 relative overflow-hidden aspect-[4/5] p-12"
                    >
                      {/* Meteor Effect */}
                      <Meteors number={15} />
                      
                      <div className="flex flex-col h-full relative z-10">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                            <Icon className="h-6 w-6 text-blue-500" />
                          </div>
                        </div>
                        <div className="text-center flex-1 flex flex-col justify-center">
                          <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                          <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Air Pollutant Details Section with Scroll Animation */}
      <section className="relative pt-0 -mt-32 pb-0 -mb-48">
        {/* Main Background */}
        <div className="absolute inset-0" style={{ background: '#000000' }}></div>
        
        {/* Twinkling Stars Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <StarsBackground
            starDensity={0.00024}
            allStarsTwinkle={true}
            twinkleProbability={0.6}
            minTwinkleSpeed={0.1}
            maxTwinkleSpeed={0.5}
          />
        </div>

        <div className="relative z-10">
          <ContainerScroll
            titleComponent={
              <div className="text-center">
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                  Understanding Our
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {' '}Target Pollutants
                  </span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Short-term forecast of gaseous air pollutants (ground-level O3 and NO2)
                </p>
              </div>
            }
          >
            {/* Two Big Cards */}
            <div className="grid lg:grid-cols-2 gap-8 h-full">
              {/* O3 Card */}
              <div className="bg-black border border-blue-400/30 rounded-2xl p-6 lg:p-8 relative overflow-hidden h-full group">
                {/* Canvas Reveal Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CanvasRevealEffect
                    animationSpeed={3}
                    containerClassName="bg-black"
                    colors={[
                      [59, 130, 246], // Blue
                      [147, 51, 234], // Purple
                    ]}
                    dotSize={2}
                  />
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mr-6">
                      <span className="text-3xl font-bold text-blue-400">O₃</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">Ozone (O₃)</h3>
                      <p className="text-blue-300 text-lg">Ground-level Ozone</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Formation Process</h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Ground-level ozone forms when nitrogen oxides (NOx) and volatile organic compounds (VOCs) 
                        react in the presence of sunlight. This photochemical reaction is most active during 
                        hot, sunny days, making it a significant concern for Delhi's air quality.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Health Impacts</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Respiratory irritation and breathing difficulties</li>
                        <li>• Aggravation of asthma and chronic lung diseases</li>
                        <li>• Reduced lung function in healthy individuals</li>
                        <li>• Increased risk of cardiovascular problems</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Why We Monitor O₃</h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Ozone levels peak during afternoon hours and can vary significantly based on weather conditions, 
                        traffic patterns, and industrial emissions. Accurate forecasting helps protect public health 
                        and enables proactive air quality management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NO2 Card */}
              <div className="bg-black border border-blue-400/30 rounded-2xl p-6 lg:p-8 relative overflow-hidden h-full group">
                {/* Canvas Reveal Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CanvasRevealEffect
                    animationSpeed={3}
                    containerClassName="bg-black"
                    colors={[
                      [59, 130, 246], // Blue
                      [147, 51, 234], // Purple
                    ]}
                    dotSize={2}
                  />
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mr-6">
                      <span className="text-3xl font-bold text-blue-400">NO₂</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">Nitrogen Dioxide (NO₂)</h3>
                      <p className="text-blue-300 text-lg">Primary Air Pollutant</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Formation Process</h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        NO₂ is formed when nitrogen monoxide (NO) reacts with oxygen in the atmosphere. 
                        It's primarily produced by combustion processes in vehicles, power plants, and industrial facilities. 
                        In Delhi, traffic emissions are the major source of NO₂ pollution.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Health Impacts</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Lung inflammation and reduced lung function</li>
                        <li>• Increased susceptibility to respiratory infections</li>
                        <li>• Worsening of asthma and chronic obstructive pulmonary disease</li>
                        <li>• Long-term exposure linked to cardiovascular disease</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Why We Monitor NO₂</h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        NO₂ levels are highest near busy roads and industrial areas. It's a key indicator of traffic-related 
                        air pollution and serves as a precursor for other harmful pollutants like ozone and particulate matter. 
                        Forecasting helps in traffic management and urban planning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ContainerScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 pt-0 -mt-48 relative">
        {/* Main Background */}
        <div className="absolute inset-0" style={{ background: '#000000' }}></div>
        
        {/* Twinkling Stars Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <StarsBackground
            starDensity={0.00024}
            allStarsTwinkle={true}
            twinkleProbability={0.6}
            minTwinkleSpeed={0.1}
            maxTwinkleSpeed={0.5}
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card relative overflow-hidden"
          >
            {/* Falling Pattern Background */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              <FallingPattern
                color="#6b7280"
                backgroundColor="#000000"
                duration={200}
                blurIntensity="0.5em"
                density={0.8}
                className="h-full w-full"
              />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Predict Delhi's Air Quality?
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Upload your data, train the model, and get accurate 24-hour forecasts 
                powered by satellite technology.
              </p>
              <GradientButton asChild variant="variant" className="relative z-50">
                <Link to="/forecast" className="inline-flex items-center justify-center relative z-50">
                  <Zap className="h-6 w-6 mr-2" />
                  Get Started Now
                </Link>
              </GradientButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomeEnhanced
