import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Wind, 
  Thermometer,
  Droplets,
  Eye,
  RefreshCw,
  Bell,
  Info,
  Wifi,
  WifiOff
} from 'lucide-react'
import { useRealTimeData, useAirQualityData, useWeatherData } from '../hooks/useRealTimeData'
import { 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import LoadingSpinner from '../components/LoadingSpinner'

interface AirQualityData {
  timestamp: string
  hour: number
  o3: number
  no2: number
  pm25?: number
  pm10?: number
  aqi: number
  category: 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous'
  color: string
}


interface SiteData {
  id: number
  name: string
  latitude: number
  longitude: number
  currentAQI: number
  currentCategory: string
  lastUpdated: string
}

const ForecastDashboard = () => {
  const [selectedSite, setSelectedSite] = useState<number>(1)
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h')
  const [autoRefresh, setAutoRefresh] = useState(true)
  
  // Real-time data hooks
  const realTimeData = useRealTimeData({
    latitude: 28.6139,
    longitude: 77.2090,
    refreshInterval: 30000,
    enableAutoRefresh: autoRefresh
  })
  
  const airQualityData = useAirQualityData(autoRefresh ? 60000 : 0)
  const weatherData = useWeatherData(28.6139, 77.2090)
  
  const [sites, setSites] = useState<SiteData[]>([])
  const [alerts, setAlerts] = useState<any[]>([])

  // Initialize sites and alerts
  useEffect(() => {
    setSites([
      { id: 1, name: "Site 1 - Central Delhi", latitude: 28.6139, longitude: 77.2090, currentAQI: 85, currentCategory: "Moderate", lastUpdated: new Date().toISOString() },
      { id: 2, name: "Site 2 - North Delhi", latitude: 28.7041, longitude: 77.1025, currentAQI: 92, currentCategory: "Moderate", lastUpdated: new Date().toISOString() },
      { id: 3, name: "Site 3 - South Delhi", latitude: 28.5355, longitude: 77.3910, currentAQI: 78, currentCategory: "Moderate", lastUpdated: new Date().toISOString() },
      { id: 4, name: "Site 4 - East Delhi", latitude: 28.6304, longitude: 77.2177, currentAQI: 105, currentCategory: "Unhealthy for Sensitive", lastUpdated: new Date().toISOString() },
      { id: 5, name: "Site 5 - West Delhi", latitude: 28.6562, longitude: 77.2410, currentAQI: 88, currentCategory: "Moderate", lastUpdated: new Date().toISOString() },
      { id: 6, name: "Site 6 - Gurgaon", latitude: 28.4595, longitude: 77.0266, currentAQI: 95, currentCategory: "Moderate", lastUpdated: new Date().toISOString() },
      { id: 7, name: "Site 7 - Noida", latitude: 28.5355, longitude: 77.3910, currentAQI: 82, currentCategory: "Moderate", lastUpdated: new Date().toISOString() }
    ])
    
    setAlerts([
      { id: 1, type: 'warning', message: 'High NO₂ levels detected at Site 4', timestamp: new Date().toISOString() },
      { id: 2, type: 'info', message: 'Model prediction accuracy: 94.2%', timestamp: new Date().toISOString() }
    ])
  }, [])

  // Generate sample chart data for visualization
  const generateSampleChartData = () => {
    const sampleData = []
    for (let i = 0; i < 24; i++) {
      const now = new Date()
      const timestamp = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000)
      const o3 = 40 + Math.sin(i * Math.PI / 12) * 20 + Math.random() * 10
      const no2 = 25 + Math.cos(i * Math.PI / 8) * 15 + Math.random() * 8
      const aqi = Math.max(o3, no2) * 2
      
      let category: AirQualityData['category'] = 'Good'
      let color = '#10B981'
      
      if (aqi > 150) {
        category = 'Unhealthy'
        color = '#EF4444'
      } else if (aqi > 100) {
        category = 'Unhealthy for Sensitive'
        color = '#F59E0B'
      } else if (aqi > 50) {
        category = 'Moderate'
        color = '#FCD34D'
      }
      
      sampleData.push({
        timestamp: timestamp.toISOString(),
        hour: timestamp.getHours(),
        o3: Math.round(o3 * 10) / 10,
        no2: Math.round(no2 * 10) / 10,
        aqi: Math.round(aqi),
        category,
        color
      })
    }
    return sampleData
  }

  const chartData = generateSampleChartData()
  const currentData = chartData[chartData.length - 1]
  const aqiCategories = [
    { name: 'Good', value: 45, color: '#10B981' },
    { name: 'Moderate', value: 35, color: '#FCD34D' },
    { name: 'Unhealthy for Sensitive', value: 15, color: '#F59E0B' },
    { name: 'Unhealthy', value: 5, color: '#EF4444' }
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

  if (realTimeData.isLoading && !realTimeData.airQuality.length) {
    return <LoadingSpinner fullScreen size="lg" message="Loading Dashboard..." />
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
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <motion.div
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-4 bg-gradient-to-br from-blue-500/30 to-blue-500/30 rounded-2xl border border-blue-400/40 backdrop-blur-sm shadow-2xl">
                  <Globe className="h-10 w-10 text-blue-300 relative z-10" />
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
              <div className="relative flex flex-col">
                <motion.h1
                  className="text-6xl font-black text-white tracking-tight leading-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Real-time Dashboard
                </motion.h1>
                
                
                <motion.p
                  className="text-gray-300/90 text-xl font-light leading-relaxed mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  Live air quality monitoring and forecasting
                </motion.p>
              </div>
            </div>
            <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
            <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
              realTimeData.isOnline 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {realTimeData.isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              <span className="text-sm">{realTimeData.isOnline ? 'Online' : 'Offline'}</span>
            </div>

            {/* Data Sources Status */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <span className="text-sm">
                {realTimeData.airQuality.length + airQualityData.openaq.length + airQualityData.cpcb.length} sources
              </span>
            </div>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                autoRefresh 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-gray-700 text-gray-400 border border-gray-600'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>Auto-refresh</span>
            </button>
            
            <div className="flex space-x-2">
              {['24h', '7d', '30d'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe as any)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedTimeframe === timeframe
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Current Status Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current AQI */}
          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{currentData?.aqi || 0}</div>
                <div className="text-sm text-gray-400">Current AQI</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentData?.color} bg-opacity-20`}>
                {currentData?.category || 'Unknown'}
              </span>
              <div className="text-xs text-gray-400">
                O₃: {currentData?.o3?.toFixed(1)} | NO₂: {currentData?.no2?.toFixed(1)}
              </div>
            </div>
            </div>
          </motion.div>

          {/* Weather */}
          {weatherData.current && (
            <motion.div 
              className="relative group overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Thermometer className="h-6 w-6 text-orange-400" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{Math.round(weatherData.current.temperature)}°C</div>
                  <div className="text-sm text-gray-400">Temperature</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <Droplets className="h-3 w-3 text-blue-400" />
                  <span className="text-gray-300">{Math.round(weatherData.current.humidity)}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-300">{Math.round(weatherData.current.windSpeed)} km/h</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Updated: {new Date(weatherData.lastUpdated).toLocaleTimeString()}
              </div>
              </div>
            </motion.div>
          )}

          {/* Active Alerts */}
          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{alerts.length}</div>
                <div className="text-sm text-gray-400">Active Alerts</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {alerts.filter(a => a.type === 'warning').length} warnings
            </div>
            </div>
          </motion.div>

          {/* Model Accuracy */}
          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Eye className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">94.2%</div>
                <div className="text-sm text-gray-400">Model Accuracy</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Air Quality Trends */}
          <motion.div variants={itemVariants} className="lg:col-span-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Air Quality Trends</h3>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">O₃</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">NO₂</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="o3" 
                  stroke="#F97316" 
                  fill="#F97316"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="no2" 
                  stroke="#EF4444" 
                  fill="#EF4444"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AQI Distribution */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative z-10 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">AQI Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={aqiCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {aqiCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {aqiCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-gray-300">{category.name}</span>
                  </div>
                  <span className="text-white font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
            </div>
          </motion.div>
        </div>

        {/* Site Status Grid */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Monitoring Sites Status</h3>
            <button className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm">
              <MapPin className="h-4 w-4" />
              <span>View Map</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sites.map((site) => (
              <div
                key={site.id}
                onClick={() => setSelectedSite(site.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedSite === site.id
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-600 bg-gray-800/50 hover:border-blue-500/50 hover:bg-blue-500/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm">{site.name}</h4>
                  <div className={`w-2 h-2 rounded-full ${
                    site.currentAQI < 50 ? 'bg-green-400' :
                    site.currentAQI < 100 ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}></div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{site.currentAQI}</div>
                <div className="text-xs text-gray-400 mb-2">{site.currentCategory}</div>
                <div className="text-xs text-gray-500">
                  {new Date(site.lastUpdated).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          </div>
        </motion.div>

        {/* Alerts Section */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">System Alerts</h3>
              <button className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm">
                <Bell className="h-4 w-4" />
                <span>Manage Alerts</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                    alert.type === 'warning' 
                      ? 'border-red-500/30 bg-red-900/20 hover:bg-red-900/30' 
                      : 'border-blue-500/30 bg-blue-900/20 hover:bg-blue-900/30'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    alert.type === 'warning' 
                      ? 'bg-red-500/20' 
                      : 'bg-blue-500/20'
                  }`}>
                    {alert.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    ) : (
                      <Info className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{alert.message}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ForecastDashboard
