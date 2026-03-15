import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Globe as GlobeIcon,
  ArrowRight,
  Satellite
} from 'lucide-react'
import Globe from '@/components/ui/globe'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-black"
    >
      {/* Cosmic background with stars */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        {/* Stars */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-80 animate-ping"></div>
        <div className="absolute top-32 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-16 right-1/3 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-24 left-3/4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"></div>
      </div>
      
      {/* Realistic Globe background - only on home page */}
      {isHomePage && (
        <div className="absolute bottom-[547px] right-0 w-96 h-96 opacity-95 pointer-events-none z-20">
          <Globe />
        </div>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* ISRO Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Satellite className="h-8 w-8 text-white" />
                </motion.div>
                <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 bg-clip-text text-transparent group-hover:from-gray-300 group-hover:to-gray-400 transition-all duration-300">
                  Air Sentinel
                </h2>
                <p className="text-blue-300 text-sm">Space-based Earth Monitoring</p>
              </div>
            </Link>
            
            {/* Mission Statement */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              ISRO: Pioneering space-based solutions for Earth's challenges, advancing science and national well-being through cutting-edge satellite technology and atmospheric monitoring.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Subscribe to our newsletter</h3>
              <form onSubmit={handleSubscribe} className="flex space-x-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your e-mail"
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none backdrop-blur-sm"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Follow Us */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Follow us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: GlobeIcon, href: "#", label: "Website" }
                ].map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-gray-800/50 border border-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
            
            {/* Navigation Menu */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Navigation</h3>
              <nav className="flex flex-wrap gap-6">
                {[
                  { label: "Home", href: "/" },
                  { label: "About ISRO", href: "/about" },
                  { label: "Missions", href: "/missions" },
                  { label: "Data & Research", href: "/research" },
                  { label: "Contact", href: "/contact" },
                  { label: "News", href: "/news" }
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>Air Sentinel © {currentYear} All rights reserved.</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer

