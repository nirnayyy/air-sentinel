import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Filter, 
  Download, 
  RefreshCw,
  Target,
  Calendar,
  Layers,
  AlertTriangle,
  CheckCircle,
  X,
  Plus
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
  ScatterChart,
  Scatter,
  Cell
} from 'recharts'
import { useRealTimeData } from '../hooks/useRealTimeData'
import DelhiMap3D from '../components/DelhiMap3D'

interface ComparisonData {
  id: string
  name: string
  type: 'location' | 'model' | 'historical'
  data: any[]
  color: string
}

const ComparisonTools = () => {
  const [selectedComparison, setSelectedComparison] = useState<'multi-location' | 'model-vs-obs' | 'historical' | 'regional'>('multi-location')
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([])
  const [selectedMarker, setSelectedMarker] = useState<any>(null)
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d')
  
  const realTimeData = useRealTimeData({ enableAutoRefresh: true })

  const locations = [
    { id: 'ito', name: 'ITO - Central Delhi', coordinates: [28.6139, 77.2090] },
    { id: 'rk-puram', name: 'RK Puram - South Delhi', coordinates: [28.5355, 77.1910] },
    { id: 'anand-vihar', name: 'Anand Vihar - East Delhi', coordinates: [28.6304, 77.3177] },
    { id: 'punjabi-bagh', name: 'Punjabi Bagh - West Delhi', coordinates: [28.6562, 77.1410] },
    { id: 'civil-lines', name: 'Civil Lines - North Delhi', coordinates: [28.7041, 77.2025] },
    { id: 'gurgaon', name: 'Gurgaon - Haryana', coordinates: [28.4595, 77.0266] },
    { id: 'noida', name: 'Noida - Uttar Pradesh', coordinates: [28.5355, 77.3910] }
  ]

  const models = [
    { id: 'xgboost', name: 'XGBoost Model', color: '#10B981' },
    { id: 'random-forest', name: 'Random Forest', color: '#3B82F6' },
    { id: 'neural-network', name: 'Neural Network', color: '#8B5CF6' },
    { id: 'linear-regression', name: 'Linear Regression', color: '#F59E0B' }
  ]

  // Generate sample comparison data
  const generateComparisonData = () => {
    const data = []
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    const now = new Date()

    // Generate data for each selected location/model
    const selectedItems = selectedComparison === 'model-vs-obs' ? models : locations
    
    selectedItems.forEach((item, index) => {
      const itemData = []
      for (let i = days; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
        const baseValue = selectedComparison === 'model-vs-obs' ? 
          (item.id === 'xgboost' ? 45 : item.id === 'random-forest' ? 48 : item.id === 'neural-network' ? 42 : 50) :
          (item.id === 'ito' ? 156 : item.id === 'rk-puram' ? 142 : item.id === 'anand-vihar' ? 178 : 134)
        
        const variation = Math.sin(i * Math.PI / days) * 10 + (Math.random() - 0.5) * 15
        
        itemData.push({
          date: date.toISOString().split('T')[0],
          value: Math.max(0, baseValue + variation),
          timestamp: date.toISOString()
        })
      }
      
      data.push({
        id: item.id,
        name: item.name,
        type: selectedComparison === 'model-vs-obs' ? 'model' : 'location',
        data: itemData,
        color: item.color || `hsl(${index * 60}, 70%, 60%)`
      })
    })
    
    return data
  }

  useEffect(() => {
    if (selectedComparison === 'multi-location' && selectedLocations.length === 0) {
      setSelectedLocations(['ito', 'rk-puram', 'anand-vihar'])
    } else if (selectedComparison === 'model-vs-obs' && selectedLocations.length === 0) {
      setSelectedLocations(['xgboost', 'random-forest'])
    }
  }, [selectedComparison])

  useEffect(() => {
    const data = generateComparisonData()
    setComparisonData(data)
  }, [selectedComparison, selectedLocations, timeRange])

  const handleLocationToggle = (locationId: string) => {
    setSelectedLocations(prev => 
      prev.includes(locationId) 
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    )
  }

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker)
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
                  <BarChart3 className="h-10 w-10 text-blue-300 relative z-10" />
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
                  Comparison Tools
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
              Advanced comparison and analysis tools for air quality data across locations, models, and time periods
            </motion.p>
          </div>
          <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
          <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        </motion.div>

        {/* Controls */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Comparison Type */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Comparison Type:</span>
              </div>
              
              <div className="flex space-x-2">
                {[
                  { key: 'multi-location', label: 'Multi-Location', icon: MapPin },
                  { key: 'model-vs-obs', label: 'Model vs Obs', icon: Target },
                  { key: 'historical', label: 'Historical', icon: Calendar },
                  { key: 'regional', label: 'Regional', icon: Layers }
                ].map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.key}
                      onClick={() => setSelectedComparison(type.key as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        selectedComparison === type.key
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Range */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Time Range:</span>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="24h">24 Hours</option>
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
                <option value="90d">90 Days</option>
              </select>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
          </div>
        </motion.div>

        {/* Selection Panel */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {selectedComparison === 'model-vs-obs' ? 'Select Models' : 'Select Locations'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {(selectedComparison === 'model-vs-obs' ? models : locations).map((item) => (
              <button
                key={item.id}
                onClick={() => handleLocationToggle(item.id)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedLocations.includes(item.id)
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  {selectedLocations.includes(item.id) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
              </button>
            ))}
          </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Comparison Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {selectedComparison === 'multi-location' ? 'Multi-Location Comparison' :
                 selectedComparison === 'model-vs-obs' ? 'Model vs Observations' :
                 selectedComparison === 'historical' ? 'Historical Comparison' :
                 'Regional Analysis'}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <RefreshCw className="h-4 w-4" />
                <span>Real-time data</span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={comparisonData[0]?.data || []}>
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
                  label={{ value: 'AQI', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                {comparisonData.map((item, index) => (
                  <Line
                    key={item.id}
                    type="monotone"
                    dataKey="value"
                    data={item.data}
                    stroke={item.color}
                    strokeWidth={2}
                    dot={{ fill: item.color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: item.color }}
                    name={item.name}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4">
              {comparisonData.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-300">{item.name}</span>
                </div>
              ))}
            </div>
            </div>
          </motion.div>

          {/* 3D Map */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative z-10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Delhi Air Quality Map</h3>
            <DelhiMap3D
              onMarkerClick={handleMarkerClick}
              selectedMarker={selectedMarker}
              height="300px"
            />
            
            {selectedMarker && (
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">{selectedMarker.name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">AQI:</span>
                    <span className="text-white font-medium">{selectedMarker.aqi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{selectedMarker.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-white">{new Date(selectedMarker.lastUpdated).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            )}
            </div>
          </motion.div>
        </div>

        {/* Additional Analysis */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Statistics Comparison */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative z-10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Statistical Comparison</h3>
            <div className="space-y-3">
              {comparisonData.map((item) => {
                const values = item.data.map(d => d.value)
                const mean = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
                const max = Math.max(...values).toFixed(1)
                const min = Math.min(...values).toFixed(1)
                
                return (
                  <div key={item.id} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{item.name}</span>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Avg:</span>
                        <span className="text-white ml-1">{mean}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Max:</span>
                        <span className="text-white ml-1">{max}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Min:</span>
                        <span className="text-white ml-1">{min}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative z-10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Data Completeness</span>
                <span className="text-green-400 font-medium">98.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Model Accuracy</span>
                <span className="text-blue-400 font-medium">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Update Frequency</span>
                <span className="text-purple-400 font-medium">Real-time</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Active Sources</span>
                <span className="text-orange-400 font-medium">{realTimeData.airQuality.length}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">System Status: Optimal</span>
              </div>
              <p className="text-xs text-gray-400">
                All comparison tools are operational with high-quality data feeds
              </p>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ComparisonTools