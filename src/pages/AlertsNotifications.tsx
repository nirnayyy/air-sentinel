import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X, 
  Plus,
  Settings,
  MapPin,
  Calendar,
  Clock,
  Mail,
  Smartphone,
  Filter,
  Search,
  Star,
  Archive,
  Trash2,
  Eye,
  TrendingUp,
  Zap
} from 'lucide-react'
import { useRealTimeData } from '../hooks/useRealTimeData'

interface Alert {
  id: string
  type: 'air_quality' | 'weather' | 'system' | 'maintenance'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  location?: string
  timestamp: string
  isRead: boolean
  isArchived: boolean
  isStarred: boolean
  parameters?: {
    aqi?: number
    o3?: number
    no2?: number
    pm25?: number
    threshold?: number
  }
}

const AlertsNotifications = () => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [activeTab, setActiveTab] = useState<'alerts' | 'settings'>('alerts')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const realTimeData = useRealTimeData({ enableAutoRefresh: true })

  useEffect(() => {
    // Generate sample alerts
    const sampleAlerts: Alert[] = [
      {
        id: '1',
        type: 'air_quality',
        severity: 'high',
        title: 'High O3 Levels Detected',
        message: 'Ozone levels have exceeded the safe threshold of 100 μg/m³ in Central Delhi',
        location: 'Central Delhi',
        timestamp: new Date().toISOString(),
        isRead: false,
        isArchived: false,
        isStarred: true,
        parameters: { o3: 125, threshold: 100 }
      },
      {
        id: '2',
        type: 'air_quality',
        severity: 'medium',
        title: 'NO2 Levels Rising',
        message: 'Nitrogen dioxide concentrations are approaching unhealthy levels',
        location: 'RK Puram',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isRead: true,
        isArchived: false,
        isStarred: false,
        parameters: { no2: 85, threshold: 100 }
      },
      {
        id: '3',
        type: 'system',
        severity: 'low',
        title: 'Data Source Update',
        message: 'CPCB monitoring station data has been successfully updated',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        isArchived: false,
        isStarred: false
      },
      {
        id: '4',
        type: 'maintenance',
        severity: 'medium',
        title: 'Scheduled Maintenance',
        message: 'System maintenance scheduled for tomorrow 2:00 AM - 4:00 AM IST',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        isArchived: false,
        isStarred: false
      },
      {
        id: '5',
        type: 'air_quality',
        severity: 'critical',
        title: 'Severe Air Pollution Alert',
        message: 'AQI levels have reached hazardous levels. Avoid outdoor activities.',
        location: 'Anand Vihar',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        isArchived: false,
        isStarred: true,
        parameters: { aqi: 350, threshold: 300 }
      }
    ]
    setAlerts(sampleAlerts)
  }, [])

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity
    return matchesSearch && matchesSeverity && !alert.isArchived
  })

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle
      case 'high': return AlertTriangle
      case 'medium': return Info
      case 'low': return CheckCircle
      default: return Info
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30'
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'air_quality': return TrendingUp
      case 'weather': return Calendar
      case 'system': return Settings
      case 'maintenance': return Zap
      default: return Bell
    }
  }

  const handleMarkAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ))
  }

  const handleToggleStar = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isStarred: !alert.isStarred } : alert
    ))
  }

  const handleArchive = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isArchived: true } : alert
    ))
  }

  const handleDelete = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

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
        <motion.div variants={itemVariants} className="mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
          </div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-4 bg-gradient-to-br from-blue-500/30 to-blue-500/30 rounded-2xl border border-blue-400/40 backdrop-blur-sm shadow-2xl">
                  <Bell className="h-10 w-10 text-blue-300 relative z-10" />
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
                  className="text-6xl font-black text-white tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Alerts & Notifications
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
              className="text-gray-300/90 text-xl font-light leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Stay informed with real-time air quality alerts and system notifications
            </motion.p>
          </div>
          <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
          <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                activeTab === 'alerts'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Bell className="h-5 w-5" />
              <span>Alerts</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'alerts' ? 'bg-blue-600' : 'bg-gray-600'
              }`}>
                {filteredAlerts.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
          </div>
        </motion.div>

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <motion.div variants={itemVariants}>
            {/* Filters and Search */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search alerts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">
                    {filteredAlerts.filter(a => !a.isRead).length} unread
                  </span>
                  <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                    Mark All Read
                  </button>
                </div>
              </div>
              </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredAlerts.map((alert) => {
                  const SeverityIcon = getSeverityIcon(alert.severity)
                  const TypeIcon = getTypeIcon(alert.type)
                  
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`relative group overflow-hidden transition-all duration-300 ${
                        !alert.isRead ? 'border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="absolute inset-0 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-blue-600/10"></div>
                      <div className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border rounded-xl p-6 group-hover:border-blue-500/50 ${
                        !alert.isRead ? 'border-l-4 border-l-blue-500' : 'border-gray-700/50'
                      }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`p-2 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                            <SeverityIcon className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <TypeIcon className="h-4 w-4 text-gray-400" />
                              <h3 className={`text-lg font-semibold ${!alert.isRead ? 'text-white' : 'text-gray-300'}`}>
                                {alert.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                                {alert.severity.toUpperCase()}
                              </span>
                            </div>
                            
                            <p className="text-gray-300 mb-3">{alert.message}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{new Date(alert.timestamp).toLocaleString()}</span>
                              </div>
                              {alert.location && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{alert.location}</span>
                                </div>
                              )}
                              {alert.parameters && (
                                <div className="flex items-center space-x-2">
                                  {alert.parameters.aqi && (
                                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                                      AQI: {alert.parameters.aqi}
                                    </span>
                                  )}
                                  {alert.parameters.o3 && (
                                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                                      O₃: {alert.parameters.o3} μg/m³
                                    </span>
                                  )}
                                  {alert.parameters.no2 && (
                                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                                      NO₂: {alert.parameters.no2} μg/m³
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleStar(alert.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              alert.isStarred 
                                ? 'bg-yellow-500/20 text-yellow-400' 
                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                            }`}
                          >
                            <Star className={`h-4 w-4 ${alert.isStarred ? 'fill-current' : ''}`} />
                          </button>
                          
                          {!alert.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(alert.id)}
                              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleArchive(alert.id)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-400 rounded-lg transition-colors"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDelete(alert.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div variants={itemVariants}>
            <div className="glass p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Notification Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <span className="text-white">Email Notifications</span>
                      </div>
                      <button className="p-1 bg-green-500 rounded-full">
                        <div className="w-4 h-4 rounded-full bg-white translate-x-3" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-green-400" />
                        <span className="text-white">Push Notifications</span>
                      </div>
                      <button className="p-1 bg-green-500 rounded-full">
                        <div className="w-4 h-4 rounded-full bg-white translate-x-3" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-purple-400" />
                        <span className="text-white">SMS Notifications</span>
                      </div>
                      <button className="p-1 bg-gray-600 rounded-full">
                        <div className="w-4 h-4 rounded-full bg-white translate-x-0" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Alert Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <label className="block text-white font-medium mb-2">Quiet Hours</label>
                      <div className="space-y-2">
                        <input
                          type="time"
                          defaultValue="22:00"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        />
                        <input
                          type="time"
                          defaultValue="07:00"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <label className="block text-white font-medium mb-2">Maximum Alerts per Hour</label>
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default AlertsNotifications

