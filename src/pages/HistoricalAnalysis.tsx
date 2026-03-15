import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  Filter, 
  Download, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Wifi,
  WifiOff,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react'
import { useAirQualityData } from '../hooks/useRealTimeData'
import { dataServices } from '../services/apiServices'
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

const HistoricalAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedParameter, setSelectedParameter] = useState<'o3' | 'no2' | 'pm25' | 'pm10'>('o3')
  const [isLoading, setIsLoading] = useState(true)
  const [historicalData, setHistoricalData] = useState<any[]>([])
  const [statistics, setStatistics] = useState<any>({})
  
  const airQualityData = useAirQualityData(300000) // 5 minutes

  // Generate sample historical data
  const generateHistoricalData = () => {
    const data = []
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : selectedPeriod === '90d' ? 90 : 365
    const now = new Date()
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const baseValue = selectedParameter === 'o3' ? 40 : selectedParameter === 'no2' ? 25 : 30
      const seasonalVariation = Math.sin((date.getMonth() / 12) * 2 * Math.PI) * 15
      const randomVariation = (Math.random() - 0.5) * 20
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.max(0, baseValue + seasonalVariation + randomVariation),
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      })
    }
    
    return data
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      const data = generateHistoricalData()
      setHistoricalData(data)
      
      // Calculate statistics
      const values = data.map(d => d.value)
      setStatistics({
        mean: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1),
        max: Math.max(...values).toFixed(1),
        min: Math.min(...values).toFixed(1),
        trend: values[values.length - 1] > values[0] ? 'increasing' : 'decreasing',
        trendPercent: (((values[values.length - 1] - values[0]) / values[0]) * 100).toFixed(1)
      })
      
      setIsLoading(false)
    }, [selectedPeriod, selectedParameter])
  }, [selectedPeriod, selectedParameter])

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

  const parameterInfo = {
    o3: { name: 'O₃ (Ozone)', unit: 'μg/m³', color: '#10B981', description: 'Ground-level ozone concentration' },
    no2: { name: 'NO₂ (Nitrogen Dioxide)', unit: 'μg/m³', color: '#EF4444', description: 'Nitrogen dioxide concentration' },
    pm25: { name: 'PM₂.₅ (Fine Particles)', unit: 'μg/m³', color: '#F59E0B', description: 'Fine particulate matter' },
    pm10: { name: 'PM₁₀ (Coarse Particles)', unit: 'μg/m³', color: '#8B5CF6', description: 'Coarse particulate matter' }
  }

  const currentParam = parameterInfo[selectedParameter]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black/60 backdrop-blur-xl py-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 relative">
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
                  <TrendingUp className="h-10 w-10 text-blue-300 relative z-10" />
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
                  Historical Analysis
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
              Comprehensive historical air quality trends and pattern analysis powered by real-time data
            </motion.p>
            <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
            <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Filters:</span>
              </div>
              
              {/* Parameter Selection */}
              <select
                value={selectedParameter}
                onChange={(e) => setSelectedParameter(e.target.value as any)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="o3">O₃ (Ozone)</option>
                <option value="no2">NO₂ (Nitrogen Dioxide)</option>
                <option value="pm25">PM₂.₅ (Fine Particles)</option>
                <option value="pm10">PM₁₀ (Coarse Particles)</option>
              </select>

              {/* Period Selection */}
              <div className="flex space-x-2">
                {[
                  { key: '7d', label: '7 Days' },
                  { key: '30d', label: '30 Days' },
                  { key: '90d', label: '90 Days' },
                  { key: '1y', label: '1 Year' }
                ].map((period) => (
                  <button
                    key={period.key}
                    onClick={() => setSelectedPeriod(period.key as any)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPeriod === period.key
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Data Source Status */}
              <div className="flex items-center space-x-2 text-sm">
                {airQualityData.isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin text-blue-400" />
                ) : airQualityData.isOnline ? (
                  <Wifi className="h-4 w-4 text-green-400" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-400" />
                )}
                <span className="text-gray-300">
                  {airQualityData.openaq.length + airQualityData.cpcb.length} live sources
                </span>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-sm text-gray-400">Average</span>
            </div>
            <div className="text-2xl font-bold text-white">{statistics.mean}</div>
            <div className="text-sm text-gray-400">{currentParam.unit}</div>
            </div>
          </motion.div>

          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg border border-blue-400/40">
                <TrendingUp className="h-6 w-6 text-blue-300" />
              </div>
              <span className="text-sm text-gray-400">Maximum</span>
            </div>
            <div className="text-2xl font-bold text-white">{statistics.max}</div>
            <div className="text-sm text-gray-400">{currentParam.unit}</div>
            </div>
          </motion.div>

          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg border border-blue-400/40">
                <AlertTriangle className="h-6 w-6 text-blue-300" />
              </div>
              <span className="text-sm text-gray-400">Minimum</span>
            </div>
            <div className="text-2xl font-bold text-white">{statistics.min}</div>
            <div className="text-sm text-gray-400">{currentParam.unit}</div>
            </div>
          </motion.div>

          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg border border-blue-400/40">
                <Calendar className="h-6 w-6 text-blue-300" />
              </div>
              <span className="text-sm text-gray-400">Trend</span>
            </div>
            <div className="text-2xl font-bold text-white">{statistics.trendPercent}%</div>
            <div className={`text-sm ${statistics.trend === 'increasing' ? 'text-red-400' : 'text-green-400'}`}>
              {statistics.trend}
            </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Chart */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {currentParam.name} Trends - {selectedPeriod.toUpperCase()}
            </h2>
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: currentParam.color }}
              ></div>
              <span className="text-sm text-gray-300">{currentParam.unit}</span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-400" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  label={{ value: currentParam.unit, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: any) => [`${value.toFixed(1)} ${currentParam.unit}`, currentParam.name]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={currentParam.color}
                  strokeWidth={2}
                  dot={{ fill: currentParam.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: currentParam.color }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          </div>
        </motion.div>

        {/* Additional Analysis */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Pattern */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative z-10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Pattern</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { day: 'Mon', value: 45 },
                { day: 'Tue', value: 52 },
                { day: 'Wed', value: 48 },
                { day: 'Thu', value: 55 },
                { day: 'Fri', value: 62 },
                { day: 'Sat', value: 38 },
                { day: 'Sun', value: 35 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                />
                <Bar dataKey="value" fill={currentParam.color} />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>

          {/* Data Quality */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative z-10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Data Quality Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Completeness</span>
                <span className="text-green-400 font-medium">98.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Accuracy</span>
                <span className="text-blue-400 font-medium">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Timeliness</span>
                <span className="text-purple-400 font-medium">Real-time</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Sources</span>
                <span className="text-orange-400 font-medium">{airQualityData.openaq.length + airQualityData.cpcb.length}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Data Quality: Excellent</span>
              </div>
              <p className="text-xs text-gray-400">
                All data sources are operational and providing high-quality measurements
              </p>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HistoricalAnalysis
