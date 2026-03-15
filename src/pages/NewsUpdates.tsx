import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Calendar, 
  Clock, 
  Tag, 
  ExternalLink,
  Search,
  Filter,
  Bookmark,
  Share2,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { useRealTimeData } from '../hooks/useRealTimeData'

interface NewsItem {
  id: number
  title: string
  content: string
  category: 'research' | 'policy' | 'technology' | 'alerts'
  publishedAt: string
  author: string
  readTime: number
  isBookmarked?: boolean
}

const NewsUpdates = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  
  const realTimeData = useRealTimeData({ enableAutoRefresh: true })

  const categories = [
    { id: 'all', name: 'All News', icon: FileText },
    { id: 'research', name: 'Research', icon: TrendingUp },
    { id: 'policy', name: 'Policy', icon: AlertTriangle },
    { id: 'technology', name: 'Technology', icon: CheckCircle },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle }
  ]

  useEffect(() => {
    // Generate sample news data
    const sampleNews: NewsItem[] = [
      {
        id: 1,
        title: "ISRO Air Sentinel Model Achieves 94.2% Accuracy in Delhi Air Quality Prediction",
        content: "The latest XGBoost model deployed in the ISRO Air Sentinel system has achieved remarkable accuracy in predicting air quality levels across Delhi. The model successfully forecasts O3 and NO2 concentrations with 94.2% accuracy, significantly improving early warning capabilities for residents.",
        category: 'research',
        publishedAt: new Date().toISOString(),
        author: 'Dr. Priya Sharma',
        readTime: 3,
        isBookmarked: false
      },
      {
        id: 2,
        title: "New Satellite Data Integration Enhances Real-time Air Quality Monitoring",
        content: "ISRO has successfully integrated Sentinel-5P satellite data with ground-based monitoring stations, providing comprehensive air quality coverage across the National Capital Region. This integration enables more accurate pollution tracking and improved public health advisories.",
        category: 'technology',
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Rajesh Kumar',
        readTime: 5,
        isBookmarked: true
      },
      {
        id: 3,
        title: "Government Announces New Air Quality Standards for 2024",
        content: "The Ministry of Environment has introduced updated air quality standards based on the latest WHO guidelines. These new standards will be implemented across all monitoring stations and will affect public health advisories and policy decisions.",
        category: 'policy',
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Ministry of Environment',
        readTime: 4,
        isBookmarked: false
      },
      {
        id: 4,
        title: "High Pollution Alert: Delhi AQI Expected to Reach Unhealthy Levels",
        content: "Current meteorological conditions indicate that air quality in Delhi may deteriorate over the next 48 hours. Residents are advised to limit outdoor activities and use appropriate protective measures.",
        category: 'alerts',
        publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        author: 'Air Quality Control Board',
        readTime: 2,
        isBookmarked: false
      },
      {
        id: 5,
        title: "Machine Learning Model Predicts Seasonal Air Quality Patterns",
        content: "Researchers at ISRO have developed a new machine learning model that can predict seasonal variations in air quality with unprecedented accuracy. This model will help in long-term planning and policy formulation for air quality management.",
        category: 'research',
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Dr. Anita Singh',
        readTime: 6,
        isBookmarked: true
      }
    ]
    
    setNewsItems(sampleNews)
  }, [])

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleBookmark = (id: number) => {
    setNewsItems(prev => prev.map(item => 
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    ))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'research': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'policy': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'technology': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'alerts': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
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
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              News & Updates
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Stay informed with the latest news, research findings, and policy updates on air quality monitoring
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="glass p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news and updates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Live Data Status */}
        <motion.div variants={itemVariants} className="glass p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Live Updates</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">{realTimeData.airQuality.length} active data sources</span>
            </div>
            <span className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </motion.div>

        {/* News Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredNews.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="glass p-6 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                  <span className="text-xs text-gray-400">{item.readTime} min read</span>
                </div>
                <button
                  onClick={() => toggleBookmark(item.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    item.isBookmarked 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${item.isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h2>
              
              <p className="text-gray-300 mb-4 line-clamp-3">
                {item.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(item.publishedAt).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm">
                    <ExternalLink className="h-4 w-4" />
                    <span>Read More</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-400">By</span>
                  <span className="text-white font-medium">{item.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            Load More News
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default NewsUpdates