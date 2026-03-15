import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Satellite, 
  Home, 
  BarChart3, 
  MapPin, 
  Info,
  Database,
  TrendingUp,
  Users,
  HelpCircle,
  Settings,
  ChevronDown,
  Globe,
  Download,
  BookOpen,
  Bell,
  Shield,
  Zap
} from 'lucide-react'

interface NavbarProps {
  isVisible?: boolean;
}

const Navbar = ({ isVisible = true }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { 
      label: 'Forecasting', 
      icon: TrendingUp,
      dropdown: [
        { path: '/forecast', label: 'Air Quality Forecast', icon: BarChart3 },
        { path: '/dashboard', label: 'Real-time Dashboard', icon: Globe },
        { path: '/historical-analysis', label: 'Historical Analysis', icon: TrendingUp },
      ]
    },
    { 
      label: 'Data & Research', 
      icon: Database,
      dropdown: [
        { path: '/data-sources', label: 'Data Sources', icon: Database },
        { path: '/methodology', label: 'Methodology', icon: BookOpen },
        { path: '/model-info', label: 'Model Information', icon: Settings },
        { path: '/research', label: 'Research & Publications', icon: BookOpen }
      ]
    },
    { 
      label: 'Tools', 
      icon: Settings,
      dropdown: [
        { path: '/comparison', label: 'Comparison Tools', icon: BarChart3 },
        { path: '/data-download', label: 'Data Download', icon: Download }
      ]
    },
    { 
      label: 'Support', 
      icon: HelpCircle,
      dropdown: [
        { path: '/user-dashboard', label: 'User Dashboard', icon: Users },
        { path: '/alerts', label: 'Alerts & Notifications', icon: Bell },
        { path: '/help', label: 'Help & Documentation', icon: HelpCircle },
        { path: '/contact', label: 'Contact Support', icon: Users }
      ]
    }
  ]

  if (!isVisible) {
    return null;
  }

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black border-b border-gray-700/50 sticky top-0 z-50"
    >
      {/* Cosmic background with stars */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        {/* Stars */}
        <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-4 right-8 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-80 animate-ping"></div>
        <div className="absolute top-6 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-3 right-1/3 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-5 left-3/4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Satellite className="h-8 w-8 text-white" />
              </motion.div>
              <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-gray-300 group-hover:to-white transition-all duration-300">
              Air Sentinel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const hasDropdown = 'dropdown' in item
              const isDropdownActive = activeDropdown === item.label
              
              if (item.path) {
                // Simple link item
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              } else if (hasDropdown) {
                // Dropdown item
                return (
                  <div key={item.label} className="relative z-50">
                    <button
                      onClick={() => setActiveDropdown(isDropdownActive ? null : item.label)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 border ${
                        isDropdownActive
                          ? 'bg-white/20 text-white border-white/30'
                          : 'text-white/80 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        isDropdownActive ? 'rotate-180' : ''
                      }`} />
                    </button>

                    <AnimatePresence>
                      {isDropdownActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-gray-700/50 rounded-lg shadow-2xl py-2 z-[9999]"
                          style={{ position: 'absolute' }}
                        >
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon
                            const isActive = location.pathname === dropdownItem.path
                            return (
                              <Link
                                key={dropdownItem.path}
                                to={dropdownItem.path}
                                onClick={() => setActiveDropdown(null)}
                                className={`flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors duration-200 ${
                                  isActive ? 'text-white bg-white/20 border-l-2 border-white/50' : 'text-white/80'
                                }`}
                              >
                                <DropdownIcon className="h-4 w-4" />
                                <span className="text-sm">{dropdownItem.label}</span>
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              return null
            })}
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-700/50"
            >
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const hasDropdown = 'dropdown' in item
                  
                  if (item.path) {
                    // Simple link item
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  } else if (hasDropdown) {
                    // Dropdown item for mobile
                    return (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-center space-x-3 px-4 py-3 text-white/80">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <div className="ml-8 space-y-1">
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon
                            const isActive = location.pathname === dropdownItem.path
                            return (
                              <Link
                                key={dropdownItem.path}
                                to={dropdownItem.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                                  isActive
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <DropdownIcon className="h-4 w-4" />
                                <span className="text-sm">{dropdownItem.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar

