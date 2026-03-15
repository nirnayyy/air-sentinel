import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Satellite, 
  Database, 
  Globe, 
  Cloud, 
  MapPin, 
  Calendar,
  Download,
  ExternalLink,
  Info,
  CheckCircle,
  Clock,
  Zap,
  Layers,
  TrendingUp,
  Wifi,
  WifiOff,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { dataServices } from '../services/apiServices'

const DataSources = () => {
  const [activeTab, setActiveTab] = useState<'satellite' | 'reanalysis' | 'ground'>('satellite')
  const [apiStatus, setApiStatus] = useState<{[key: string]: {status: 'online' | 'offline' | 'testing', lastCheck: string, dataCount?: number}}>({})
  const [isCheckingAPIs, setIsCheckingAPIs] = useState(false)

  // Check API status
  const checkAPIStatus = async () => {
    setIsCheckingAPIs(true)
    const status: {[key: string]: any} = {}
    const now = new Date().toISOString()

    try {
      // Check OpenAQ
      const openaqData = await dataServices.openaq.getLatestMeasurements('IN', 10)
      status.openaq = {
        status: openaqData.length > 0 ? 'online' : 'offline',
        lastCheck: now,
        dataCount: openaqData.length
      }
    } catch {
      status.openaq = { status: 'offline', lastCheck: now }
    }

    try {
      // Check CPCB
      const cpcbData = await dataServices.cpcb.getRealTimeAQI()
      status.cpcb = {
        status: cpcbData.length > 0 ? 'online' : 'offline',
        lastCheck: now,
        dataCount: cpcbData.length
      }
    } catch {
      status.cpcb = { status: 'offline', lastCheck: now }
    }

    try {
      // Check WAQI
      const waqiData = await dataServices.waqi.getCityAQI('delhi')
      status.waqi = {
        status: waqiData ? 'online' : 'offline',
        lastCheck: now,
        dataCount: waqiData ? 1 : 0
      }
    } catch {
      status.waqi = { status: 'offline', lastCheck: now }
    }

    try {
      // Check MOSDAC
      const mosdacData = await dataServices.mosdac.getINSATData()
      status.mosdac = {
        status: mosdacData.length > 0 ? 'online' : 'offline',
        lastCheck: now,
        dataCount: mosdacData.length
      }
    } catch {
      status.mosdac = { status: 'offline', lastCheck: now }
    }

    setApiStatus(status)
    setIsCheckingAPIs(false)
  }

  useEffect(() => {
    checkAPIStatus()
    const interval = setInterval(checkAPIStatus, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  const satelliteData = [
    {
      name: "Sentinel-5P",
      provider: "ESA Copernicus",
      description: "TROPOMI instrument providing NO₂ and HCHO measurements",
      parameters: ["NO₂ Column Density", "HCHO Column Density", "Aerosol Index"],
      resolution: "7x3.5 km",
      frequency: "Daily",
      coverage: "Global",
      availability: "2017-present",
      quality: "High",
      icon: Satellite
    },
    {
      name: "MODIS Terra/Aqua",
      provider: "NASA",
      description: "Moderate Resolution Imaging Spectroradiometer",
      parameters: ["Aerosol Optical Depth", "Cloud Properties", "Land Surface"],
      resolution: "250m-1km",
      frequency: "Daily",
      coverage: "Global",
      availability: "2000-present",
      quality: "High",
      icon: Globe
    },
    {
      name: "VIIRS",
      provider: "NOAA/NASA",
      description: "Visible Infrared Imaging Radiometer Suite",
      parameters: ["Night Lights", "Aerosol Properties", "Cloud Mask"],
      resolution: "375m-750m",
      frequency: "Daily",
      coverage: "Global",
      availability: "2011-present",
      quality: "High",
      icon: Layers
    }
  ]

  const reanalysisData = [
    {
      name: "ERA5",
      provider: "ECMWF",
      description: "Fifth generation European Centre for Medium-Range Weather Forecasts reanalysis",
      parameters: ["Temperature", "Humidity", "Wind (u,v,w)", "Pressure", "Precipitation"],
      resolution: "31km",
      frequency: "Hourly",
      coverage: "Global",
      availability: "1940-present",
      quality: "Very High",
      icon: Cloud
    },
    {
      name: "MERRA-2",
      provider: "NASA",
      description: "Modern-Era Retrospective analysis for Research and Applications",
      parameters: ["Meteorological Variables", "Aerosol Properties", "Radiation"],
      resolution: "50km",
      frequency: "Hourly",
      coverage: "Global",
      availability: "1980-present",
      quality: "High",
      icon: TrendingUp
    },
    {
      name: "GFS",
      provider: "NOAA",
      description: "Global Forecast System operational forecasts",
      parameters: ["Weather Forecasts", "Temperature", "Wind", "Humidity"],
      resolution: "13km",
      frequency: "6-hourly",
      coverage: "Global",
      availability: "Real-time",
      quality: "High",
      icon: Zap
    }
  ]

  const groundData = [
    {
      name: "CPCB Network",
      provider: "Central Pollution Control Board",
      description: "Continuous Ambient Air Quality Monitoring Stations",
      parameters: ["PM2.5", "PM10", "NO₂", "O₃", "SO₂", "CO"],
      resolution: "Point measurements",
      frequency: "Hourly",
      coverage: "Delhi NCR",
      availability: "2015-present",
      quality: "High",
      icon: MapPin
    },
    {
      name: "SAFAR",
      provider: "IITM-MoES",
      description: "System of Air Quality and Weather Forecasting",
      parameters: ["Air Quality Parameters", "Weather Variables", "Health Advisory"],
      resolution: "Point measurements",
      frequency: "Hourly",
      coverage: "Major Indian Cities",
      availability: "2010-present",
      quality: "High",
      icon: CheckCircle
    }
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

  const DataCard = ({ data, type }: { data: any, type: string }) => {
    const Icon = data.icon
    return (
      <motion.div
        variants={itemVariants}
        className="glass p-6 hover:border-blue-500/50 transition-all duration-300 group"
      >
        <div className="flex items-start space-x-4 mb-4">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                {data.name}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                data.quality === 'Very High' ? 'bg-green-500/20 text-green-400' :
                data.quality === 'High' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {data.quality} Quality
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-2">{data.provider}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{data.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Parameters</div>
            <div className="text-sm text-gray-300">
              {data.parameters.slice(0, 3).join(', ')}
              {data.parameters.length > 3 && ` +${data.parameters.length - 3} more`}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Resolution</div>
            <div className="text-sm text-gray-300">{data.resolution}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Frequency</div>
            <div className="text-sm text-gray-300 flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{data.frequency}</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Coverage</div>
            <div className="text-sm text-gray-300 flex items-center space-x-1">
              <Globe className="h-3 w-3" />
              <span>{data.coverage}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Available: {data.availability}</span>
          </div>
          <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm">
            <Download className="h-4 w-4" />
            <span>Access</span>
          </button>
        </div>
      </motion.div>
    )
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
                  <Database className="h-10 w-10 text-blue-300 relative z-10" />
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
                  Data Sources
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
              Comprehensive data sources powering our air quality forecasting system
            </motion.p>
            <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
            <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          </div>
        </motion.div>

        {/* Live API Status */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Wifi className="h-5 w-5 text-green-400" />
                <span>Live API Status</span>
              </h2>
              <button
                onClick={checkAPIStatus}
                disabled={isCheckingAPIs}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isCheckingAPIs ? 'animate-spin' : ''}`} />
                <span>{isCheckingAPIs ? 'Checking...' : 'Check APIs'}</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { key: 'openaq', name: 'OpenAQ', description: 'Global Air Quality Data' },
                { key: 'cpcb', name: 'CPCB', description: 'Indian Air Quality Index' },
                { key: 'waqi', name: 'WAQI', description: 'World Air Quality Index' },
                { key: 'mosdac', name: 'MOSDAC', description: 'ISRO Satellite Data' }
              ].map((api) => {
                const status = apiStatus[api.key]
                const isOnline = status?.status === 'online'
                
                return (
                  <div key={api.key} className="p-4 rounded-lg border border-gray-700 bg-gray-800/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{api.name}</h3>
                      <div className={`flex items-center space-x-1 ${
                        isOnline ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                        <span className="text-xs">{isOnline ? 'Online' : 'Offline'}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{api.description}</p>
                    {status?.dataCount !== undefined && (
                      <p className="text-xs text-blue-400">
                        {status.dataCount} records available
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Last checked: {status ? new Date(status.lastCheck).toLocaleTimeString() : 'Never'}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Data Overview Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Satellite Missions", value: "3", icon: Satellite, color: "blue" },
            { label: "Reanalysis Models", value: "3", icon: Cloud, color: "blue" },
            { label: "Ground Stations", value: "7", icon: MapPin, color: "blue" },
            { label: "Total Parameters", value: "20+", icon: TrendingUp, color: "blue" }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div 
                key={index} 
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
                  <div className="inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-400/40">
                    <Icon className="h-6 w-6 text-blue-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
            <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg mb-6">
              {[
                { id: 'satellite', label: 'Satellite Data', icon: Satellite },
                { id: 'reanalysis', label: 'Reanalysis Data', icon: Cloud },
                { id: 'ground', label: 'Ground Measurements', icon: MapPin }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeTab === 'satellite' && satelliteData.map((data, index) => (
                <DataCard key={index} data={data} type="satellite" />
              ))}
              {activeTab === 'reanalysis' && reanalysisData.map((data, index) => (
                <DataCard key={index} data={data} type="reanalysis" />
              ))}
              {activeTab === 'ground' && groundData.map((data, index) => (
                <DataCard key={index} data={data} type="ground" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Data Processing Pipeline */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Data Processing Pipeline</h2>
              <p className="text-gray-300">How we process and integrate multi-source data</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Data Acquisition",
                  description: "Automated collection from satellite APIs and ground stations",
                  icon: Download
                },
                {
                  step: "02", 
                  title: "Quality Control",
                  description: "Validation, filtering, and outlier detection",
                  icon: CheckCircle
                },
                {
                  step: "03",
                  title: "Preprocessing",
                  description: "Temporal alignment, interpolation, and feature engineering",
                  icon: Zap
                },
                {
                  step: "04",
                  title: "Integration",
                  description: "Multi-source data fusion for comprehensive forecasting",
                  icon: Layers
                }
              ].map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div 
                    key={index} 
                    className="text-center relative group overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-400/40 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Icon className="h-8 w-8 text-blue-300" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                          {step.step}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Data Access Information */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Data Access & Usage</h2>
              <p className="text-gray-300">Information about accessing and using our data sources</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Info className="h-5 w-5 text-blue-400" />
                  <span>Access Methods</span>
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>RESTful API endpoints</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Direct database queries</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>CSV/JSON export formats</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Real-time data streams</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-blue-400" />
                  <span>External Sources</span>
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 text-blue-400" />
                    <a href="#" className="hover:text-blue-400 transition-colors">ESA Copernicus Open Access Hub</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 text-blue-400" />
                    <a href="#" className="hover:text-blue-400 transition-colors">ECMWF Climate Data Store</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 text-blue-400" />
                    <a href="#" className="hover:text-blue-400 transition-colors">NASA Earthdata</a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 text-blue-400" />
                    <a href="#" className="hover:text-blue-400 transition-colors">CPCB Air Quality Data</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DataSources
