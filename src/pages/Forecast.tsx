import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  Target,
  TrendingUp,
  Clock,
  FileText,
  Eye,
  RefreshCw,
  Info,
  Settings,
  Search,
  BarChart3 as ChartBar,
  Cpu,
  Layers,
  Globe,
  MapPin,
  ArrowRight,
  Database as Data,
  Brain,
  Gauge
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'
import LoadingSpinner from '../components/LoadingSpinner'

interface Site {
  id: number
  name: string
  latitude: number
  longitude: number
}

interface ModelMetrics {
  O3: {
    rmse: number
    r2: number
    ria: number
  }
  NO2: {
    rmse: number
    r2: number
    ria: number
  }
  model_type?: string
  training_date?: string
  data_shape?: [number, number]
  features_used?: number
}

interface Prediction {
  date?: string
  hour?: number
  O3_predicted: number
  NO2_predicted: number
  O3_actual?: number
  NO2_actual?: number
}

interface DataPreview {
  columns: string[]
  sample_data: any[]
  total_rows: number
}

interface UploadProgress {
  isUploading: boolean
  progress: number
  fileName: string
}


const Forecast = () => {
  const [selectedSite, setSelectedSite] = useState<number>(1)
  const [sites, setSites] = useState<Site[]>([])
  const [isTraining, setIsTraining] = useState(false)
  const [isPredicting, setIsPredicting] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics | null>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [status, setStatus] = useState<string>('')
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('info')
  const [activeTab, setActiveTab] = useState<'train' | 'predict' | 'results'>('train')
  const [dataPreview, setDataPreview] = useState<DataPreview | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h')
  const [uploadProgress] = useState<UploadProgress>({
    isUploading: false,
    progress: 0,
    fileName: ''
  })
  
  const trainFileRef = useRef<HTMLInputElement>(null)
  const predictFileRef = useRef<HTMLInputElement>(null)

  // Load sites and metrics on component mount
  useEffect(() => {
    fetchSites()
    fetchModelMetrics()
  }, [])

  // Load metrics when site changes
  useEffect(() => {
    if (selectedSite) {
      fetchModelMetrics()
    }
  }, [selectedSite])

  const fetchSites = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sites')
      if (response.ok) {
        const sitesData = await response.json()
        setSites(sitesData.sites || sitesData)
      }
    } catch (error) {
      console.error('Error fetching sites:', error)
      showStatus('Failed to load monitoring sites', 'error')
    }
  }

  const fetchModelMetrics = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/metrics/site/${selectedSite}`)
      if (response.ok) {
        const metricsData = await response.json()
        setModelMetrics(metricsData)
      }
    } catch (error) {
      console.error('Error fetching model metrics:', error)
      // Don't show error for metrics as it's not critical
    }
  }

  const showStatus = (message: string, type: 'success' | 'error' | 'info') => {
    setStatus(message)
    setStatusType(type)
    setTimeout(() => setStatus(''), 5000)
  }

  const handleTrainFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoadingData(true)
    
    try {
      // Preview the data first
      const formData = new FormData()
      formData.append('file', file)
      
      // Here you would typically send to backend for preview
      // For now, we'll simulate the preview
      const preview: DataPreview = {
        columns: ['year', 'month', 'day', 'hour', 'O3_forecast', 'NO2_forecast', 'T_forecast', 'q_forecast', 'u_forecast', 'v_forecast', 'w_forecast', 'NO2_satellite', 'HCHO_satellite', 'ratio_satellite', 'O3_target', 'NO2_target'],
        sample_data: [
          { year: 2022, month: 7, day: 28, hour: 0, O3_forecast: 73.35, NO2_forecast: 57.54, O3_target: 5.03, NO2_target: 6.75 },
          { year: 2022, month: 7, day: 28, hour: 1, O3_forecast: 82.77, NO2_forecast: 57.25, O3_target: 5.08, NO2_target: 6.07 }
        ],
        total_rows: 25000
      }
      
      setDataPreview(preview)
      showStatus('Data file loaded successfully. Ready for training.', 'success')
    } catch (error) {
      showStatus('Failed to load data file', 'error')
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleTrainModel = async () => {
    if (!trainFileRef.current?.files?.[0]) {
      showStatus('Please select a training data file', 'error')
      return
    }

    setIsTraining(true)
    const formData = new FormData()
    formData.append('file', trainFileRef.current.files[0])
    formData.append('siteId', selectedSite.toString())

    try {
      const response = await fetch('http://localhost:5001/api/train', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        setModelMetrics(result.metrics)
        showStatus('Model trained successfully!', 'success')
        setActiveTab('predict')
      } else {
        showStatus(result.error || 'Training failed', 'error')
      }
    } catch (error) {
      showStatus('Failed to train model', 'error')
    } finally {
      setIsTraining(false)
    }
  }

  const handlePredictFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoadingData(true)
    // Similar preview logic for prediction data
    setIsLoadingData(false)
  }

  const handleGeneratePredictions = async () => {
    setIsPredicting(true)

    try {
      // Generate sample input data for 24 hours
      const inputData = []
      for (let hour = 0; hour < 24; hour++) {
        inputData.push({
          year: 2024,
          month: 9,
          day: 30,
          hour: hour,
          O3_forecast: 45.0 + hour * 0.5,
          NO2_forecast: 32.0 + hour * 0.3,
          T_forecast: 25.0 + hour * 0.2,
          q_forecast: 12.0,
          u_forecast: 2.0,
          v_forecast: -1.0,
          w_forecast: 0.05
        })
      }

      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          site_id: selectedSite,
          input_data: inputData
        })
      })

      const result = await response.json()

      if (response.ok && result.predictions) {
        setPredictions(result.predictions)
        showStatus(`Predictions generated successfully for ${result.site_name}!`, 'success')
        setActiveTab('results')
      } else {
        showStatus(result.error || 'Prediction failed', 'error')
      }
    } catch (error) {
      showStatus('Failed to generate predictions', 'error')
    } finally {
      setIsPredicting(false)
    }
  }

  const downloadResults = () => {
    if (predictions.length === 0) return
    
    const csvContent = [
      'Hour,O3_Predicted (μg/m³),NO2_Predicted (μg/m³),O3_Actual (μg/m³),NO2_Actual (μg/m³)',
      ...predictions.map((p, i) => 
        `${i},${p.O3_predicted.toFixed(2)},${p.NO2_predicted.toFixed(2)},${p.O3_actual?.toFixed(2) || 'N/A'},${p.NO2_actual?.toFixed(2) || 'N/A'}`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `site_${selectedSite}_predictions.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Generate sample prediction data for demonstration
  const generateSamplePredictions = () => {
    const sampleData: Prediction[] = []
    for (let i = 0; i < 24; i++) {
      sampleData.push({
        hour: i,
        O3_predicted: 50 + Math.sin(i * Math.PI / 12) * 20 + Math.random() * 10,
        NO2_predicted: 30 + Math.cos(i * Math.PI / 8) * 15 + Math.random() * 8,
        O3_actual: i < 12 ? 50 + Math.sin(i * Math.PI / 12) * 20 + Math.random() * 10 : undefined,
        NO2_actual: i < 12 ? 30 + Math.cos(i * Math.PI / 8) * 15 + Math.random() * 8 : undefined
      })
    }
    return sampleData
  }

  // Use actual predictions if available, otherwise show sample data
  const displayPredictions = predictions.length > 0 ? predictions : generateSamplePredictions()

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
      className="min-h-screen bg-black py-8 relative overflow-hidden"
    >
      {/* Cosmic background with stars */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        {/* Stars */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-80 animate-ping"></div>
        <div className="absolute top-32 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-16 right-1/3 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-24 left-3/4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-60 left-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-80 right-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl border border-blue-400/40 backdrop-blur-sm shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-sm"></div>
                  <Target className="h-10 w-10 text-blue-300 relative z-10" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
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
                  Air Quality Forecasting
                </motion.h1>
                
                {/* Glowing line below title */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full blur-sm"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scaleX: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2
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
              Advanced machine learning models for precise 24-hour forecasts of ground-level 
              <span className="text-blue-300 font-medium"> O₃ </span>
              and 
              <span className="text-blue-400 font-medium"> NO₂ </span>
              concentrations across monitoring sites
            </motion.p>
            
            {/* Floating Elements */}
            <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
            <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          </div>
        </motion.div>

        {/* Site Selection */}
        <motion.div variants={itemVariants} className="relative mb-8">
          {/* Background with starfield pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          
          <div className="relative z-10 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg border border-blue-400/40">
                <Globe className="h-6 w-6 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Select Monitoring Site</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sites.map((site) => (
                <motion.button
                  key={site.id}
                  onClick={() => setSelectedSite(site.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-6 rounded-xl border transition-all duration-300 overflow-hidden ${
                    selectedSite === site.id
                      ? 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-300 shadow-lg shadow-blue-500/20'
                      : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-blue-400/50 hover:bg-blue-500/10'
                  }`}
                >
                  {/* Ripple effect on selection */}
                  {selectedSite === site.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-xl"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className={`h-5 w-5 ${selectedSite === site.id ? 'text-blue-300' : 'text-gray-400'}`} />
                    </div>
                    <div className="font-semibold text-lg">{site.name}</div>
                    <div className="text-sm opacity-75 mt-1">
                      {site.latitude.toFixed(4)}°, {site.longitude.toFixed(4)}°
                    </div>
                  </div>
                  
                  {/* Glow effect for selected site */}
                  {selectedSite === site.id && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-blue-500/10 blur-sm"></div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2">
            <div className="flex space-x-2">
              {[
                { id: 'train', label: 'Train Model', icon: Settings, color: 'from-blue-500 to-blue-600' },
                { id: 'predict', label: 'Generate Predictions', icon: Search, color: 'from-blue-400 to-blue-500' },
                { id: 'results', label: 'View Results', icon: ChartBar, color: 'from-blue-600 to-blue-700' }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 overflow-hidden ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                    }`}
                  >
                    {/* Glass effect for active tab */}
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>
                    )}
                    
                    <div className="relative z-10 flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-semibold">{tab.label}</span>
                    </div>
                    
                    {/* Glow effect for active tab */}
                    {activeTab === tab.id && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-20 blur-sm rounded-xl`}></div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <AnimatePresence mode="wait">
            {activeTab === 'train' && (
              <motion.div
                key="train"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* File Upload */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg border border-blue-400/40">
                        <Upload className="h-6 w-6 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Upload Training Data</h3>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                      <div className="relative border-2 border-dashed border-gray-600/50 rounded-2xl p-8 text-center hover:border-blue-400/50 transition-all duration-300 bg-gray-900/30 backdrop-blur-sm">
                        <input
                          ref={trainFileRef}
                          type="file"
                          accept=".csv"
                          onChange={handleTrainFileUpload}
                          className="hidden"
                        />
                        
                        <motion.div
                          className="relative mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl border border-blue-400/30 inline-block">
                            <Data className="h-12 w-12 text-blue-300" />
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
                        
                        <p className="text-gray-300 mb-4 text-lg">Upload CSV training data</p>
                        <p className="text-gray-400 text-sm mb-6">Supported formats: .csv files with air quality measurements</p>
                        
                        <motion.button
                          onClick={() => trainFileRef.current?.click()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-blue-500/25"
                        >
                          Choose File
                        </motion.button>
                        
                        {/* Progress bar */}
                        {uploadProgress.isUploading && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4"
                          >
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress.progress}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            <p className="text-sm text-gray-400 mt-2">{uploadProgress.fileName}</p>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Data Preview */}
                    {dataPreview && (
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Eye className="h-5 w-5 text-blue-400" />
                          <h4 className="font-semibold text-white">Data Preview</h4>
                        </div>
                        <div className="text-sm text-gray-300 space-y-1">
                          <p>Columns: {dataPreview.columns.length}</p>
                          <p>Total Rows: {dataPreview.total_rows.toLocaleString()}</p>
                          <p>Features: {dataPreview.columns.filter(col => !col.includes('target')).length}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Model Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg border border-blue-400/40">
                        <Brain className="h-6 w-6 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Model Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { icon: Cpu, label: 'Algorithm', value: 'Ensemble (XGBoost + LightGBM + Random Forest)', color: 'blue' },
                        { icon: Target, label: 'Target Variables', value: 'O₃, NO₂', color: 'blue' },
                        { icon: Layers, label: 'Features', value: '7 meteorological + temporal', color: 'blue' },
                        { icon: Gauge, label: 'Model Status', value: 'Pre-trained & Ready', color: 'blue' }
                      ].map((item, index) => {
                        const Icon = item.icon
                        const colorClasses = {
                          blue: 'from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-300'
                        }
                        
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-gradient-to-r ${colorClasses[item.color as keyof typeof colorClasses]} rounded-xl p-4 border backdrop-blur-sm`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 bg-gradient-to-br ${colorClasses[item.color as keyof typeof colorClasses]} rounded-lg`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <span className="text-gray-300 font-medium">{item.label}:</span>
                              </div>
                              <span className="text-white font-semibold">{item.value}</span>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="relative w-full group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300 font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                        <CheckCircle className="h-5 w-5" />
                        <span>Models Pre-trained & Ready</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'predict' && (
              <motion.div
                key="predict"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Prediction Input */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Brain className="h-6 w-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">AI Model Input</h3>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Ready for Prediction</span>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Input Features:</span>
                          <span className="text-white">7 meteorological parameters</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Time Range:</span>
                          <span className="text-white">24-hour forecast</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Model Type:</span>
                          <span className="text-white">Ensemble ML</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Output:</span>
                          <span className="text-white">O₃ & NO₂ concentrations</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-gray-300 text-xs">
                          The model will generate predictions using current meteorological conditions 
                          and temporal features for the selected monitoring site.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Model Status */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Target className="h-6 w-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Model Status</h3>
                    </div>
                    
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Models Ready</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Site:</span>
                          <span className="text-white">Site {selectedSite}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Models:</span>
                          <span className="text-white">XGBoost + LightGBM + RF</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Status:</span>
                          <span className="text-green-400">Pre-trained</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Targets:</span>
                          <span className="text-white">O₃ & NO₂</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGeneratePredictions}
                      disabled={isPredicting}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
                    >
                      {isPredicting ? (
                        <>
                          <RefreshCw className="h-5 w-5 animate-spin" />
                          <span>Generating Predictions...</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-5 w-5" />
                          <span>Generate 24-Hour Forecast</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Timeframe Selection */}
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-medium">Time Range:</span>
                  <div className="flex space-x-2">
                    {['24h', '7d', '30d'].map((timeframe) => (
                      <button
                        key={timeframe}
                        onClick={() => setSelectedTimeframe(timeframe as any)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          selectedTimeframe === timeframe
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {timeframe}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prediction Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* O3 Predictions */}
                  <div className="glass p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                        <span>O₃ Concentration (μg/m³)</span>
                      </h3>
                      <div className="text-sm text-gray-400">24-hour forecast</div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={displayPredictions}>
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
                        <Line 
                          type="monotone" 
                          dataKey="O3_predicted" 
                          stroke="#F97316" 
                          strokeWidth={2}
                          name="Predicted O₃"
                          dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="O3_actual" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          name="Actual O₃"
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* NO2 Predictions */}
                  <div className="glass p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span>NO₂ Concentration (μg/m³)</span>
                      </h3>
                      <div className="text-sm text-gray-400">24-hour forecast</div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={displayPredictions}>
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
                        <Line 
                          type="monotone" 
                          dataKey="NO2_predicted" 
                          stroke="#EF4444" 
                          strokeWidth={2}
                          name="Predicted NO₂"
                          dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="NO2_actual" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          name="Actual NO₂"
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Download Results */}
                <div className="flex justify-center">
                  <button
                    onClick={downloadResults}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Predictions (CSV)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Status Message */}
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed bottom-6 right-6 max-w-sm p-4 rounded-lg shadow-2xl z-50 ${
                statusType === 'success' 
                  ? 'bg-green-900/90 border border-green-500/30 text-green-100'
                  : statusType === 'error'
                  ? 'bg-red-900/90 border border-red-500/30 text-red-100'
                  : 'bg-blue-900/90 border border-blue-500/30 text-blue-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                {statusType === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : statusType === 'error' ? (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                ) : (
                  <Info className="h-5 w-5 text-blue-400" />
                )}
                <span className="font-medium">{status}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        {(isTraining || isPredicting || isLoadingData) && (
          <LoadingSpinner 
            fullScreen 
            size="lg"
            message={
              isTraining ? "Training ML Model..." :
              isPredicting ? "Generating Predictions..." :
              "Loading Data..."
            }
          />
        )}
      </div>
    </motion.div>
  )
}

export default Forecast