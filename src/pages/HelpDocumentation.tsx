import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HelpCircle, 
  Book, 
  Video, 
  MessageCircle, 
  Search, 
  ChevronDown,
  ChevronRight,
  FileText,
  Play,
  Download,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  Star,
  Users,
  Zap,
  Globe,
  Shield,
  BarChart3,
  MapPin,
  Settings
} from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  helpful: number
}

const HelpDocumentation = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I interpret air quality index (AQI) values?',
      answer: 'AQI values range from 0-500. 0-50 is Good (green), 51-100 is Moderate (yellow), 101-150 is Unhealthy for Sensitive Groups (orange), 151-200 is Unhealthy (red), 201-300 is Very Unhealthy (purple), and 301-500 is Hazardous (maroon).',
      category: 'General',
      tags: ['AQI', 'air quality', 'interpretation'],
      helpful: 45
    },
    {
      id: '2',
      question: 'How accurate are the air quality predictions?',
      answer: 'Our XGBoost model achieves 94.2% accuracy in predicting O3 and NO2 concentrations for the next 24 hours. Predictions are based on meteorological data, satellite observations, and historical patterns.',
      category: 'Technical',
      tags: ['accuracy', 'prediction', 'model'],
      helpful: 38
    },
    {
      id: '3',
      question: 'How often is the data updated?',
      answer: 'Air quality data is updated in real-time from ground monitoring stations. Satellite data is updated daily. Weather forecast data is updated every 6 hours.',
      category: 'Data',
      tags: ['update', 'frequency', 'real-time'],
      helpful: 52
    },
    {
      id: '4',
      question: 'Can I download the raw data?',
      answer: 'Yes, you can access and download raw data through our API or data download section. Contact us for bulk data requests or specific data formats.',
      category: 'Data',
      tags: ['download', 'API', 'data access'],
      helpful: 29
    },
    {
      id: '5',
      question: 'How do I set up air quality alerts?',
      answer: 'Go to the Alerts & Notifications page, click "Create Rule", select your parameters (O3, NO2, PM2.5), set thresholds, and choose notification methods (email, SMS, push).',
      category: 'Alerts',
      tags: ['alerts', 'notifications', 'setup'],
      helpful: 41
    }
  ]

  const categories = [
    { id: 'all', name: 'All Topics', icon: Globe },
    { id: 'General', name: 'General', icon: HelpCircle },
    { id: 'Technical', name: 'Technical', icon: Settings },
    { id: 'Data', name: 'Data', icon: BarChart3 },
    { id: 'Alerts', name: 'Alerts', icon: Zap }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
                  <HelpCircle className="h-10 w-10 text-blue-300 relative z-10" />
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
                  Help & Documentation
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
              Find answers, tutorials, and resources to help you make the most of ISRO Air Sentinel
            </motion.p>
          </div>
          <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
          <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search help topics, tutorials, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
              <Book className="h-5 w-5 text-blue-400" />
              <span className="text-white">User Guide</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
              <Video className="h-5 w-5 text-green-400" />
              <span className="text-white">Video Tutorials</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
              <FileText className="h-5 w-5 text-purple-400" />
              <span className="text-white">API Documentation</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
              <MessageCircle className="h-5 w-5 text-orange-400" />
              <span className="text-white">Contact Support</span>
            </button>
          </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* FAQ Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
                <span className="text-gray-400 text-sm">{filteredFAQs.length} questions</span>
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-700 rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition-colors"
                    >
                      <h3 className="text-white font-medium">{faq.question}</h3>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-gray-300 mb-4">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Tags:</span>
                            {faq.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-xs text-gray-400">{faq.helpful} helpful</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Support */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Need More Help?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Email Support</div>
                    <div className="text-gray-400 text-sm">support@isroairsentinel.gov.in</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Phone Support</div>
                    <div className="text-gray-400 text-sm">+91-11-2569-0000</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">Support Hours</div>
                    <div className="text-gray-400 text-sm">Mon-Fri: 9:00 AM - 6:00 PM IST</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                Contact Support
              </button>
              </div>
            </div>

            {/* Quick Resources */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Resources</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <span className="text-white">User Manual PDF</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                </a>
                
                <a href="#" className="flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Video className="h-5 w-5 text-green-400" />
                  <span className="text-white">Video Tutorials</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                </a>
                
                <a href="#" className="flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Globe className="h-5 w-5 text-purple-400" />
                  <span className="text-white">API Documentation</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                </a>
              </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Popular Topics</h3>
              <div className="space-y-2">
                {['AQI Interpretation', 'Setting Up Alerts', 'Data Download', 'API Access', 'Troubleshooting'].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSearchQuery(topic)}
                    className="w-full text-left p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default HelpDocumentation