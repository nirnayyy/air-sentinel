import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Settings, 
  Bell, 
  MapPin, 
  Heart, 
  Clock, 
  TrendingUp,
  BarChart3,
  Download,
  Share2,
  Edit3,
  Save,
  X,
  Plus,
  Star,
  Calendar,
  Filter,
  Search,
  Globe,
  Smartphone,
  Mail,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useRealTimeData } from '../hooks/useRealTimeData'

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@example.com',
    avatar: '',
    role: 'Research Scientist',
    organization: 'ISRO',
    memberSince: '2022-01-15',
    preferences: {
      notifications: true,
      emailAlerts: true,
      smsAlerts: false,
      theme: 'dark',
      language: 'en',
      timezone: 'Asia/Kolkata'
    },
    savedLocations: [
      { id: 1, name: 'Home - Central Delhi', coordinates: [28.6139, 77.2090], isDefault: true },
      { id: 2, name: 'Office - RK Puram', coordinates: [28.5355, 77.1910], isDefault: false },
      { id: 3, name: 'Parents House - Gurgaon', coordinates: [28.4595, 77.0266], isDefault: false }
    ],
    favoriteParameters: ['O3', 'NO2', 'PM2.5'],
    usageStats: {
      totalQueries: 1247,
      favoritePages: ['Forecast Dashboard', 'Historical Analysis', 'Comparison Tools'],
      lastActive: new Date().toISOString()
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editingLocation, setEditingLocation] = useState<any>(null)
  const [newLocation, setNewLocation] = useState({ name: '', coordinates: [0, 0] })
  
  const realTimeData = useRealTimeData({ enableAutoRefresh: true })

  const recentActivity = [
    { id: 1, action: 'Viewed Forecast Dashboard', timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), type: 'view' },
    { id: 2, action: 'Downloaded historical data', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), type: 'download' },
    { id: 3, action: 'Set up location alert', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), type: 'alert' },
    { id: 4, action: 'Compared air quality data', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), type: 'compare' },
    { id: 5, action: 'Updated notification preferences', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), type: 'settings' }
  ]

  const quickStats = [
    { label: 'Total Queries', value: user.usageStats.totalQueries, icon: BarChart3, color: 'blue' },
    { label: 'Saved Locations', value: user.savedLocations.length, icon: MapPin, color: 'green' },
    { label: 'Active Alerts', value: 3, icon: Bell, color: 'orange' },
    { label: 'Data Downloads', value: 47, icon: Download, color: 'purple' }
  ]

  const generateChartData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        queries: Math.floor(Math.random() * 50) + 20,
        downloads: Math.floor(Math.random() * 10) + 5
      })
    }
    return data
  }

  const handleSavePreferences = () => {
    // Simulate API call
    console.log('Saving preferences:', user.preferences)
    setIsEditing(false)
  }

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.coordinates[0] !== 0) {
      const location = {
        id: Date.now(),
        name: newLocation.name,
        coordinates: newLocation.coordinates,
        isDefault: false
      }
      setUser(prev => ({
        ...prev,
        savedLocations: [...prev.savedLocations, location]
      }))
      setNewLocation({ name: '', coordinates: [0, 0] })
    }
  }

  const handleDeleteLocation = (id: number) => {
    setUser(prev => ({
      ...prev,
      savedLocations: prev.savedLocations.filter(loc => loc.id !== id)
    }))
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
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-4 bg-gradient-to-br from-blue-500/30 to-blue-500/30 rounded-2xl border border-blue-400/40 backdrop-blur-sm shadow-2xl">
                    <User className="h-10 w-10 text-blue-300 relative z-10" />
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
                    Welcome back, {user.name.split(' ')[0]}!
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
                className="text-gray-300/90 text-xl font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                Manage your preferences, locations, and track your usage
              </motion.p>
              <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
              <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-300 rounded-xl transition-all duration-300 border border-blue-400/40 backdrop-blur-sm"
              >
                <Settings className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div 
                key={index} 
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg border border-blue-400/40">
                      <Icon className="h-6 w-6 text-blue-300" />
                    </div>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400">{user.role}</p>
                  <p className="text-gray-500 text-sm">{user.organization}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">Member since {new Date(user.memberSince).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">Last active {new Date(user.usageStats.lastActive).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            {/* Saved Locations */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Saved Locations</h3>
                <button
                  onClick={() => setNewLocation({ name: '', coordinates: [28.6139, 77.2090] })}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {user.savedLocations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">{location.name}</div>
                        <div className="text-gray-400 text-sm">
                          {location.coordinates[0].toFixed(4)}, {location.coordinates[1].toFixed(4)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {location.isDefault && (
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      )}
                      <button
                        onClick={() => handleDeleteLocation(location.id)}
                        className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add New Location */}
                {newLocation.name && (
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-blue-500/30">
                    <input
                      type="text"
                      placeholder="Location name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none mb-2"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleAddLocation}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors"
                      >
                        <Save className="h-3 w-3 inline mr-1" />
                        Save
                      </button>
                      <button
                        onClick={() => setNewLocation({ name: '', coordinates: [0, 0] })}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Usage Analytics */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Usage Analytics</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={generateChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F3F4F6' }} />
                  <Bar dataKey="queries" fill="#3B82F6" />
                  <Bar dataKey="downloads" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'view' ? 'bg-blue-500/20' :
                      activity.type === 'download' ? 'bg-green-500/20' :
                      activity.type === 'alert' ? 'bg-orange-500/20' :
                      activity.type === 'compare' ? 'bg-purple-500/20' :
                      'bg-gray-500/20'
                    }`}>
                      <BarChart3 className={`h-4 w-4 ${
                        activity.type === 'view' ? 'text-blue-400' :
                        activity.type === 'download' ? 'text-green-400' :
                        activity.type === 'alert' ? 'text-orange-400' :
                        activity.type === 'compare' ? 'text-purple-400' :
                        'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{activity.action}</div>
                      <div className="text-gray-400 text-sm">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-4 w-4 text-blue-400" />
                    <span className="text-white">Push Notifications</span>
                  </div>
                  <button
                    onClick={() => setUser(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, notifications: !prev.preferences.notifications }
                    }))}
                    className={`p-1 rounded-full transition-colors ${
                      user.preferences.notifications ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      user.preferences.notifications ? 'translate-x-3' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-green-400" />
                    <span className="text-white">Email Alerts</span>
                  </div>
                  <button
                    onClick={() => setUser(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, emailAlerts: !prev.preferences.emailAlerts }
                    }))}
                    className={`p-1 rounded-full transition-colors ${
                      user.preferences.emailAlerts ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      user.preferences.emailAlerts ? 'translate-x-3' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-4 w-4 text-purple-400" />
                    <span className="text-white">SMS Alerts</span>
                  </div>
                  <button
                    onClick={() => setUser(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, smsAlerts: !prev.preferences.smsAlerts }
                    }))}
                    className={`p-1 rounded-full transition-colors ${
                      user.preferences.smsAlerts ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      user.preferences.smsAlerts ? 'translate-x-3' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default UserDashboard