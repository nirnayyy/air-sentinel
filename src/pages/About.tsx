import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Satellite, BarChart3, Globe, Shield, Zap, Users, Trophy, Target } from 'lucide-react'
import ShootingStarsCard from '../components/ui/ShootingStars'
import { GradientButton } from '@/components/ui/gradient-button'

const About = () => {
  const features = [
    {
      icon: Satellite,
      title: 'ISRO Integration',
      description: 'Leveraging ISRO\'s satellite data for accurate air quality monitoring and prediction'
    },
    {
      icon: BarChart3,
      title: 'Machine Learning',
      description: 'Advanced ensemble models (XGBoost + LightGBM + Random Forest) trained on satellite and ground-level data'
    },
    {
      icon: Globe,
      title: '3D Visualization',
      description: 'Interactive 3D maps and space-themed visualizations for better understanding'
    },
    {
      icon: Shield,
      title: 'Environmental Impact',
      description: 'Helping Delhi residents make informed decisions about air quality'
    }
  ]

  const stats = [
    { number: '7', label: 'Monitoring Sites', icon: Target },
    { number: '24', label: 'Hour Forecasts', icon: Zap },
    { number: '95%', label: 'Accuracy Rate', icon: Trophy },
    { number: '1000+', label: 'Data Points', icon: BarChart3 }
  ]

  const team = [
    {
      name: 'ISRO Team',
      role: 'Satellite Data & Space Technology',
      description: 'Providing real-time satellite data and space technology expertise'
    },
    {
      name: 'ML Engineers',
      role: 'Machine Learning & AI',
      description: 'Developing and optimizing ensemble models (XGBoost + LightGBM + Random Forest) for air quality prediction'
    },
    {
      name: 'Frontend Team',
      role: 'User Interface & Experience',
      description: 'Creating intuitive 3D visualizations and interactive dashboards'
    },
    {
      name: 'Data Scientists',
      role: 'Data Processing & Analytics',
      description: 'Processing satellite data and generating actionable insights'
    }
  ]

  return (
    <div className="min-h-screen bg-black/60 backdrop-blur-xl py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-4 bg-gradient-to-br from-blue-500/30 to-blue-500/30 rounded-2xl border border-blue-400/40 backdrop-blur-sm shadow-2xl">
                  <Satellite className="h-10 w-10 text-blue-300 relative z-10" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <div className="relative">
                <motion.h1
                  className="text-6xl font-black bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  About Air Sentinel
                </motion.h1>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full blur-sm opacity-60"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scaleX: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
            <motion.p
              className="text-gray-300/90 text-xl max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              A revolutionary air quality forecasting system that combines ISRO's satellite technology 
              with cutting-edge machine learning to predict Delhi's air quality 24 hours in advance
            </motion.p>
            <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
            <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
              To harness the power of space technology and artificial intelligence to provide accurate, 
              real-time air quality forecasts that help Delhi residents make informed decisions about 
              their health and outdoor activities. We believe that clean air is a fundamental right, 
              and technology should be used to protect and improve our environment.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
                    {/* Shooting Star Effect */}
                    <ShootingStarsCard count={2} speed={2.5} size={1.5} />
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/40 group-hover:to-blue-600/40 transition-colors duration-300 relative z-10 border border-blue-400/40">
                      <Icon className="h-8 w-8 text-blue-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
                    <p className="text-white/70 relative z-10">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Project Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-isro-orange to-isro-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-isro-orange" />
                Backend & ML
              </h3>
              <ul className="space-y-2 text-white/80">
                <li>• Node.js & Express.js for API development</li>
                <li>• Python with XGBoost for machine learning</li>
                <li>• scikit-learn for data preprocessing</li>
                <li>• Real-time data processing pipeline</li>
                <li>• ISRO satellite data integration</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Globe className="h-6 w-6 mr-2 text-isro-gold" />
                Frontend & Visualization
              </h3>
              <ul className="space-y-2 text-white/80">
                <li>• React with TypeScript</li>
                <li>• Three.js for 3D visualizations</li>
                <li>• Framer Motion for animations</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Recharts for data visualization</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-isro-orange to-isro-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                <p className="text-isro-orange text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-white/70 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="card">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Explore?</h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Start using Air Sentinel to get accurate air quality forecasts for Delhi. 
              Upload your data, train models, and generate predictions powered by space technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton asChild className="text-lg px-8 py-4">
                <Link to="/forecast" className="inline-flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 mr-2" />
                  Start Forecasting
                </Link>
              </GradientButton>
              <GradientButton asChild variant="variant" className="text-lg px-8 py-4">
                <Link to="/sites" className="inline-flex items-center justify-center">
                  <Globe className="h-6 w-6 mr-2" />
                  Explore Sites
                </Link>
              </GradientButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

