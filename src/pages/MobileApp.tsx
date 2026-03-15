import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Store, 
  Download, 
  QrCode, 
  CheckCircle, 
  Star,
  Bell,
  MapPin,
  BarChart3,
  Cloud,
  Shield,
  Zap
} from 'lucide-react'

const MobileApp = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('android')

  const features = [
    {
      icon: Bell,
      title: "Real-time Alerts",
      description: "Get instant notifications about air quality changes in your area"
    },
    {
      icon: MapPin,
      title: "Location-based Data",
      description: "View air quality data for your current location and nearby areas"
    },
    {
      icon: BarChart3,
      title: "Interactive Charts",
      description: "Explore detailed air quality trends and historical data"
    },
    {
      icon: Cloud,
      title: "Offline Access",
      description: "Access cached data even without internet connection"
    },
    {
      icon: Shield,
      title: "Health Recommendations",
      description: "Get personalized health advice based on air quality levels"
    },
    {
      icon: Zap,
      title: "Fast & Lightweight",
      description: "Optimized performance with minimal battery usage"
    }
  ]

  const reviews = [
    { name: "Priya Sharma", rating: 5, comment: "Essential app for Delhi residents!" },
    { name: "Rajesh Kumar", rating: 5, comment: "Accurate data and great UI design" },
    { name: "Anita Singh", rating: 4, comment: "Helps me plan my outdoor activities" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black/60 backdrop-blur-xl py-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <Smartphone className="h-12 w-12 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mobile App
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Download the ISRO Air Sentinel mobile app for real-time air quality monitoring on the go
          </p>
          
          {/* Download Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center space-x-3 px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors">
              <Store className="h-6 w-6" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="text-sm font-medium">App Store</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors">
              <Store className="h-6 w-6" />
              <div className="text-left">
                <div className="text-xs text-gray-400">GET IT ON</div>
                <div className="text-sm font-medium">Google Play</div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* App Preview */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="glass p-8">
            <h2 className="text-2xl font-bold text-white mb-6">App Screenshots</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-400">App screenshots coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8">
            <h2 className="text-2xl font-bold text-white mb-6">QR Code Download</h2>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg inline-block mb-4">
                <QrCode className="h-32 w-32 text-black" />
              </div>
              <p className="text-gray-300">Scan to download the mobile app</p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">App Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass p-6 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">User Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass p-6"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{review.comment}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-white font-medium">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Requirements */}
        <motion.div variants={itemVariants} className="glass p-8">
          <h2 className="text-2xl font-bold text-white mb-6">System Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-blue-400" />
                <span>iOS Requirements</span>
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>iOS 12.0 or later</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>iPhone 6s or later</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>50 MB available space</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-green-400" />
                <span>Android Requirements</span>
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Android 7.0 or later</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>2 GB RAM minimum</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>50 MB available space</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MobileApp