import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  Database, 
  FileText, 
  Calendar,
  MapPin,
  Filter,
  Search,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  HardDrive,
  Globe,
  BarChart3,
  TrendingUp,
  Settings,
  ChevronDown,
  ChevronRight,
  Info,
  ExternalLink,
  Share2,
  Archive,
  Layers,
  Wifi,
  WifiOff,
  Zap,
  Eye
} from 'lucide-react'
import { useRealTimeData } from '../hooks/useRealTimeData'

interface Dataset {
  id: string
  name: string
  description: string
  category: 'raw' | 'processed' | 'forecast' | 'satellite' | 'model'
  size: string
  format: 'CSV' | 'JSON' | 'NetCDF' | 'GeoTIFF'
  lastUpdated: string
  records: number
  parameters: string[]
  status: 'available' | 'processing' | 'maintenance'
  downloadCount: number
  tags: string[]
  license: string
  quality: 'high' | 'medium' | 'preliminary'
}

const DataDownload = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<string>('all')
  const [selectedQuality, setSelectedQuality] = useState<string>('all')
  const [expandedDataset, setExpandedDataset] = useState<string | null>(null)
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  
  const realTimeData = useRealTimeData({ enableAutoRefresh: isAutoRefresh })

  useEffect(() => {
    generateSampleDatasets()
  }, [])

  const generateSampleDatasets = () => {
    const sampleDatasets: Dataset[] = [
      {
        id: '1',
        name: 'Delhi Air Quality - Hourly Measurements',
        description: 'Comprehensive hourly air quality measurements from all monitoring stations in Delhi region',
        category: 'raw',
        size: '2.4 GB',
        format: 'CSV',
        lastUpdated: new Date().toISOString(),
        records: 1250000,
        parameters: ['O3', 'NO2', 'PM2.5', 'PM10', 'SO2', 'CO'],
        status: 'available',
        downloadCount: 1247,
        tags: ['air-quality', 'delhi', 'hourly', 'ground-stations'],
        license: 'CC BY 4.0',
        quality: 'high'
      },
      {
        id: '2',
        name: 'ISRO Satellite NO2 Data - Processed',
        description: 'Processed NO2 column density data from ISRO satellites (Sentinel-5P, MODIS)',
        category: 'satellite',
        size: '850 MB',
        format: 'NetCDF',
        lastUpdated: new Date(Date.now() - 86400000).toISOString(),
        records: 45000,
        parameters: ['NO2_column', 'cloud_fraction', 'quality_flag'],
        status: 'available',
        downloadCount: 892,
        tags: ['satellite', 'no2', 'isro', 'sentinel-5p'],
        license: 'CC BY-SA 4.0',
        quality: 'high'
      },
      {
        id: '3',
        name: 'XGBoost Model Predictions - 24h Forecast',
        description: '24-hour ahead air quality predictions using XGBoost model for all monitoring sites',
        category: 'forecast',
        size: '125 MB',
        format: 'JSON',
        lastUpdated: new Date(Date.now() - 3600000).toISOString(),
        records: 168,
        parameters: ['O3_forecast', 'NO2_forecast', 'confidence_interval'],
        status: 'available',
        downloadCount: 2341,
        tags: ['forecast', 'xgboost', 'predictions', '24h'],
        license: 'CC BY 4.0',
        quality: 'high'
      },
      {
        id: '4',
        name: 'Meteorological Reanalysis Data - ERA5',
        description: 'Atmospheric reanalysis data including temperature, humidity, wind speed and direction',
        category: 'processed',
        size: '4.2 GB',
        format: 'NetCDF',
        lastUpdated: new Date(Date.now() - 172800000).toISOString(),
        records: 87600,
        parameters: ['temperature', 'humidity', 'wind_speed', 'wind_direction', 'pressure'],
        status: 'available',
        downloadCount: 567,
        tags: ['meteorology', 'era5', 'reanalysis', 'weather'],
        license: 'CC BY 4.0',
        quality: 'high'
      },
      {
        id: '5',
        name: 'Model Performance Metrics - Validation Results',
        description: 'Comprehensive validation results and performance metrics for all ML models',
        category: 'model',
        size: '45 MB',
        format: 'JSON',
        lastUpdated: new Date(Date.now() - 259200000).toISOString(),
        records: 2400,
        parameters: ['rmse', 'r2', 'mae', 'bias', 'skill_score'],
        status: 'available',
        downloadCount: 445,
        tags: ['validation', 'metrics', 'ml-models', 'performance'],
        license: 'CC BY 4.0',
        quality: 'high'
      }
    ]
    setDatasets(sampleDatasets)
  }

  const categories = [
    { id: 'all', name: 'All Datasets', icon: Database, color: 'blue' },
    { id: 'raw', name: 'Raw Data', icon: HardDrive, color: 'green' },
    { id: 'processed', name: 'Processed Data', icon: Settings, color: 'purple' },
    { id: 'forecast', name: 'Forecasts', icon: TrendingUp, color: 'orange' },
    { id: 'satellite', name: 'Satellite Data', icon: Globe, color: 'cyan' },
    { id: 'model', name: 'Model Outputs', icon: BarChart3, color: 'pink' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'processing': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'maintenance': return 'text-orange-400 bg-orange-500/20 border-orange-500/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'text-green-400 bg-green-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'preliminary': return 'text-orange-400 bg-orange-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'CSV': return FileText
      case 'JSON': return Database
      case 'NetCDF': return Globe
      case 'GeoTIFF': return MapPin
      default: return FileText
    }
  }

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory
    const matchesFormat = selectedFormat === 'all' || dataset.format === selectedFormat
    const matchesQuality = selectedQuality === 'all' || dataset.quality === selectedQuality
    
    return matchesSearch && matchesCategory && matchesFormat && matchesQuality
  })

  const handleDatasetSelect = (datasetId: string) => {
    setSelectedDatasets(prev => 
      prev.includes(datasetId) 
        ? prev.filter(id => id !== datasetId)
        : [...prev, datasetId]
    )
  }

  const handleDownloadRequest = async (datasetId: string) => {
    // Simulate download request
    console.log(`Download requested for dataset: ${datasetId}`)
    // In a real app, this would make an API call
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
                  <Download className="h-10 w-10 text-blue-300 relative z-10" />
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
                  Data Download
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
              Access comprehensive air quality datasets, satellite data, and model outputs for research and analysis
            </motion.p>
          </div>
          <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
          <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Database className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-sm text-gray-400">Total Datasets</span>
            </div>
            <div className="text-2xl font-bold text-white">{datasets.length}</div>
            </div>
          </motion.div>

          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-sm text-gray-400">Available</span>
            </div>
            <div className="text-2xl font-bold text-white">{datasets.filter(d => d.status === 'available').length}</div>
            </div>
          </motion.div>

          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Download className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-sm text-gray-400">Total Downloads</span>
            </div>
            <div className="text-2xl font-bold text-white">{datasets.reduce((acc, d) => acc + d.downloadCount, 0)}</div>
            </div>
          </motion.div>

          <motion.div 
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
              <span className="text-sm text-gray-400">Last Updated</span>
            </div>
            <div className="text-2xl font-bold text-white">2h ago</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>

              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Formats</option>
                <option value="CSV">CSV</option>
                <option value="JSON">JSON</option>
                <option value="NetCDF">NetCDF</option>
                <option value="GeoTIFF">GeoTIFF</option>
              </select>

              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Filter className="h-4 w-4 inline mr-1" />
                Advanced
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isAutoRefresh ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {isAutoRefresh ? <Wifi className="h-4 w-4 inline mr-1" /> : <WifiOff className="h-4 w-4 inline mr-1" />}
                Auto Refresh
              </button>

              {selectedDatasets.length > 0 && (
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Download className="h-4 w-4 inline mr-1" />
                  Download Selected ({selectedDatasets.length})
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-700 pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Data Quality</label>
                    <select
                      value={selectedQuality}
                      onChange={(e) => setSelectedQuality(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="all">All Quality</option>
                      <option value="high">High Quality</option>
                      <option value="medium">Medium Quality</option>
                      <option value="preliminary">Preliminary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Spatial Coverage</label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                      <option value="all">All Regions</option>
                      <option value="delhi">Delhi NCR</option>
                      <option value="northern-india">Northern India</option>
                      <option value="south-asia">South Asia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Actions</label>
                    <div className="flex space-x-2">
                      <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm">
                        Apply Filters
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedQuality('all')
                        }}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {category.id === 'all' ? datasets.length : datasets.filter(d => d.category === category.id).length}
                  </span>
                </button>
              )
            })}
          </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Datasets List */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Available Datasets</h2>
                <span className="text-gray-400 text-sm">{filteredDatasets.length} datasets</span>
              </div>

              <div className="space-y-4">
                {filteredDatasets.map((dataset) => {
                  const FormatIcon = getFormatIcon(dataset.format)
                  return (
                    <div key={dataset.id} className="border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <input
                              type="checkbox"
                              checked={selectedDatasets.includes(dataset.id)}
                              onChange={() => handleDatasetSelect(dataset.id)}
                              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <h3 className="text-white font-semibold">{dataset.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(dataset.status)}`}>
                              {dataset.status.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(dataset.quality)}`}>
                              {dataset.quality.toUpperCase()}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-3">{dataset.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <FormatIcon className="h-4 w-4" />
                              <span>{dataset.format}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <HardDrive className="h-4 w-4" />
                              <span>{dataset.size}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BarChart3 className="h-4 w-4" />
                              <span>{dataset.records.toLocaleString()} records</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{dataset.downloadCount} downloads</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => setExpandedDataset(expandedDataset === dataset.id ? null : dataset.id)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
                          >
                            {expandedDataset === dataset.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </button>
                          
                          {dataset.status === 'available' && (
                            <button
                              onClick={() => handleDownloadRequest(dataset.id)}
                              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            >
                              <Download className="h-4 w-4 inline mr-1" />
                              Download
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedDataset === dataset.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-white font-medium mb-2">Parameters</h4>
                              <div className="flex flex-wrap gap-2">
                                {dataset.parameters.map((param, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                                    {param}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-white font-medium mb-2">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {dataset.tags.map((tag, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-white font-medium mb-2">License</h4>
                              <p className="text-gray-300 text-sm">{dataset.license}</p>
                            </div>

                            <div>
                              <h4 className="text-white font-medium mb-2">Last Updated</h4>
                              <p className="text-gray-300 text-sm">
                                {new Date(dataset.lastUpdated).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Quick Actions */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Archive className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Download All Raw Data</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Globe className="h-5 w-5 text-green-400" />
                  <span className="text-white">Export Satellite Data</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  <span className="text-white">Download Forecast Models</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Share2 className="h-5 w-5 text-orange-400" />
                  <span className="text-white">Share Dataset Collection</span>
                </button>
              </div>
              </div>
            </div>

            {/* Data Usage Guidelines */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Usage Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p>All datasets are provided under Creative Commons licenses</p>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p>Preliminary data should be used with caution</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Download links expire after 24 hours</p>
                </div>
                <div className="flex items-start space-x-2">
                  <ExternalLink className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <p>Please cite ISRO Air Sentinel in your research</p>
                </div>
              </div>
              </div>
            </div>

            {/* Recent Downloads */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Delhi Air Quality Data</span>
                  <span className="text-green-400">Completed</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Satellite NO2 Data</span>
                  <span className="text-blue-400">Processing</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Model Predictions</span>
                  <span className="text-gray-400">Failed</span>
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

export default DataDownload
