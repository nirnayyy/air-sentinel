import React from 'react'
import { motion } from 'framer-motion'
import ShootingStarsCard from '../components/ui/ShootingStars'
import { 
  Brain, 
  Database, 
  Target, 
  TrendingUp, 
  Zap,
  CheckCircle,
  ArrowRight,
  Clock,
  Layers,
  BarChart3,
  Settings,
  Cpu
} from 'lucide-react'

const Methodology = () => {
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

  const methodologySteps = [
    {
      step: "01",
      title: "Data Collection & Preprocessing",
      description: "Multi-source data integration with quality control and temporal alignment",
      icon: Database,
      details: [
        "Satellite data from Sentinel-5P (NO₂, HCHO)",
        "Reanalysis data from ERA5 (meteorological variables)",
        "Ground measurements from 7 monitoring sites",
        "Forward-fill for missing satellite observations",
        "Temporal interpolation and outlier detection"
      ]
    },
    {
      step: "02",
      title: "Feature Engineering",
      description: "Advanced feature creation including temporal and lagged variables",
      icon: Layers,
      details: [
        "Cyclical encoding for temporal variables (hour, day of year)",
        "7-day lagged target variables (O₃, NO₂)",
        "Rolling statistics (24h mean, standard deviation)",
        "Satellite data interpolation and gap filling",
        "Weather forecast variables integration"
      ]
    },
    {
      step: "03",
      title: "Model Architecture",
      description: "Ensemble model combining XGBoost, LightGBM, and Random Forest for air quality prediction",
      icon: Brain,
      details: [
        "XGBoost: Gradient boosting with optimized hyperparameters",
        "LightGBM: Fast gradient boosting for categorical features",
        "Random Forest: Ensemble of decision trees for stability",
        "Multi-output prediction (O₃ and NO₂ simultaneously)",
        "Weighted ensemble combination for improved robustness"
      ]
    },
    {
      step: "04",
      title: "Training & Validation",
      description: "Comprehensive model training with performance evaluation",
      icon: Target,
      details: [
        "80-20 train-test split with temporal ordering",
        "5-fold time series cross-validation",
        "Hyperparameter optimization using Bayesian methods",
        "Performance metrics: RMSE, R², RIA",
        "Feature importance and model interpretability"
      ]
    },
    {
      step: "05",
      title: "Prediction & Forecasting",
      description: "24-hour ahead forecasting with uncertainty quantification",
      icon: TrendingUp,
      details: [
        "Real-time prediction pipeline",
        "24-hour ahead forecasts at hourly resolution",
        "Confidence intervals and uncertainty estimates",
        "Model performance monitoring",
        "Automated retraining schedules"
      ]
    }
  ]

  const metrics = [
    {
      name: "RMSE (Root Mean Square Error)",
      description: "Measures the average magnitude of prediction errors",
      formula: "√(Σ(y_pred - y_true)² / n)",
      unit: "μg/m³",
      target: "< 15 μg/m³",
      icon: BarChart3
    },
    {
      name: "R² (Coefficient of Determination)",
      description: "Proportion of variance explained by the model",
      formula: "1 - (SS_res / SS_tot)",
      unit: "dimensionless",
      target: "> 0.85",
      icon: TrendingUp
    },
    {
      name: "RIA (Relative Improvement over Average)",
      description: "Relative improvement compared to naive prediction",
      formula: "(1 - RMSE_model / RMSE_naive) × 100",
      unit: "%",
      target: "> 70%",
      icon: Zap
    }
  ]

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
                  <Brain className="h-10 w-10 text-blue-300 relative z-10" />
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
                  Methodology
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
              Comprehensive approach to air quality forecasting using advanced machine learning techniques
            </motion.p>
            <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
            <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          </div>
        </motion.div>

        {/* Overview */}
        <motion.div variants={itemVariants} className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Approach</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Our methodology combines cutting-edge machine learning with comprehensive data integration 
                  to deliver accurate 24-hour air quality forecasts. We leverage multi-source satellite data, 
                  meteorological reanalysis, and ground measurements to predict ground-level O₃ and NO₂ concentrations.
                </p>
                <div className="space-y-3">
                  {[
                    "Multi-source data fusion",
                    "Advanced feature engineering",
                    "XGBoost regression modeling",
                    "Real-time prediction pipeline",
                    "Continuous model monitoring"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold text-white">Target Variables</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Ground-level O₃ and NO₂ concentrations (μg/m³)</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold text-white">Forecast Horizon</h3>
                  </div>
                  <p className="text-gray-300 text-sm">24-hour ahead predictions at hourly resolution</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Cpu className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold text-white">Model Type</h3>
                  </div>
                  <p className="text-gray-300 text-sm">XGBoost Multi-output Regression</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Methodology Steps */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Methodology Pipeline</h2>
          <div className="space-y-8">
            {methodologySteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-400/40 rounded-xl flex items-center justify-center">
                          <Icon className="h-8 w-8 text-blue-300" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{step.title}</h3>
                          {index < methodologySteps.length - 1 && (
                            <ArrowRight className="h-5 w-5 text-blue-400" />
                          )}
                        </div>
                        <p className="text-gray-300 mb-4">{step.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div variants={itemVariants} className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <motion.div 
                    key={index} 
                    className="relative group overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-400/40 rounded-lg">
                          <Icon className="h-5 w-5 text-blue-300" />
                        </div>
                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{metric.name}</h3>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{metric.description}</p>
                      <div className="bg-gray-700/50 rounded-lg p-3 mb-3">
                        <div className="text-xs text-gray-400 mb-1">Formula</div>
                        <div className="text-sm font-mono text-blue-400">{metric.formula}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-400">Unit</div>
                          <div className="text-sm text-gray-300">{metric.unit}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">Target</div>
                          <div className="text-sm font-semibold text-blue-400">{metric.target}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Data Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Temporal Resolution:</span>
                    <span className="text-white font-medium">Hourly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Spatial Coverage:</span>
                    <span className="text-white font-medium">Delhi NCR (7 sites)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Data Period:</span>
                    <span className="text-white font-medium">July 2019 - June 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Input Features:</span>
                    <span className="text-white font-medium">14 + 7-day lag</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Model Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Algorithm:</span>
                    <span className="text-white font-medium">Ensemble (XGBoost + LightGBM + Random Forest)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Training Split:</span>
                    <span className="text-white font-medium">80% / 20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Cross-Validation:</span>
                    <span className="text-white font-medium">5-fold Time Series</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Update Frequency:</span>
                    <span className="text-white font-medium">Daily</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Methodology

