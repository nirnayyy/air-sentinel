import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Database,
  Globe,
  Users,
  Settings
} from 'lucide-react'

const PrivacyTerms = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy')

  const privacySections = [
    {
      title: "Data Collection",
      icon: Database,
      content: "We collect air quality data from multiple sources including ground monitoring stations, satellite observations, and meteorological models. Personal information is only collected when you voluntarily provide it through contact forms or account registration."
    },
    {
      title: "Data Usage",
      icon: Settings,
      content: "Collected data is used to provide air quality forecasts, generate reports, improve our models, and enhance public health advisories. We do not sell or share personal information with third parties without explicit consent."
    },
    {
      title: "Data Protection",
      icon: Shield,
      content: "All data is encrypted in transit and at rest. We implement industry-standard security measures including access controls, regular security audits, and secure data storage protocols."
    },
    {
      title: "User Rights",
      icon: Users,
      content: "Users have the right to access, modify, or delete their personal data. You can request data portability, object to processing, or withdraw consent at any time by contacting our support team."
    }
  ]

  const termsSections = [
    {
      title: "Service Usage",
      icon: Globe,
      content: "The ISRO Air Sentinel service is provided for informational purposes. Users agree to use the service responsibly and in accordance with applicable laws and regulations."
    },
    {
      title: "Data Accuracy",
      icon: CheckCircle,
      content: "While we strive for accuracy, air quality data and forecasts are provided 'as is' without warranty. Users should not rely solely on this data for health or safety decisions."
    },
    {
      title: "Intellectual Property",
      icon: FileText,
      content: "All content, data, and technology used in this service are protected by intellectual property rights. Users may not reproduce, distribute, or modify content without authorization."
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: "ISRO and its partners are not liable for any damages arising from the use of this service. Users acknowledge that air quality predictions may have inherent uncertainties."
    }
  ]

  const cookieTypes = [
    {
      name: "Essential Cookies",
      description: "Required for basic website functionality and security",
      examples: ["Session management", "Security tokens", "User preferences"],
      mandatory: true
    },
    {
      name: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website",
      examples: ["Page views", "User behavior", "Performance metrics"],
      mandatory: false
    },
    {
      name: "Functional Cookies",
      description: "Enable enhanced features and personalization",
      examples: ["Language preferences", "Theme settings", "Map configurations"],
      mandatory: false
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
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Privacy & Terms
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Our commitment to protecting your privacy and the terms governing the use of our services
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="glass p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'privacy', name: 'Privacy Policy', icon: Shield },
              { id: 'terms', name: 'Terms of Service', icon: FileText },
              { id: 'cookies', name: 'Cookie Policy', icon: Lock }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Privacy Policy */}
        {activeTab === 'privacy' && (
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="glass p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Privacy Policy</h2>
              <p className="text-gray-300 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {privacySections.map((section, index) => {
                  const Icon = section.icon
                  return (
                    <div key={index} className="p-6 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{section.content}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="glass p-8">
              <h3 className="text-xl font-bold text-white mb-6">Data Retention</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 mb-2">7 Years</div>
                  <div className="text-gray-300">Air Quality Data</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-2">2 Years</div>
                  <div className="text-gray-300">User Accounts</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400 mb-2">1 Year</div>
                  <div className="text-gray-300">Analytics Data</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Terms of Service */}
        {activeTab === 'terms' && (
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="glass p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Terms of Service</h2>
              <p className="text-gray-300 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {termsSections.map((section, index) => {
                  const Icon = section.icon
                  return (
                    <div key={index} className="p-6 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{section.content}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="glass p-8">
              <h3 className="text-xl font-bold text-white mb-6">Service Availability</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">Uptime Target</h4>
                  <p className="text-gray-300">We strive for 99.9% uptime but cannot guarantee uninterrupted service.</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">Maintenance Windows</h4>
                  <p className="text-gray-300">Scheduled maintenance typically occurs during low-usage hours.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cookie Policy */}
        {activeTab === 'cookies' && (
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="glass p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Cookie Policy</h2>
              <p className="text-gray-300 mb-8">
                We use cookies to enhance your experience and analyze website usage.
              </p>
              
              <div className="space-y-6">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="p-6 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">{cookie.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cookie.mandatory 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {cookie.mandatory ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{cookie.description}</p>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Examples:</h4>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-8">
              <h3 className="text-xl font-bold text-white mb-6">Cookie Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">Browser Settings</h4>
                  <p className="text-gray-300">You can control cookies through your browser settings, but this may affect website functionality.</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">Cookie Preferences</h4>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    Manage Cookie Preferences
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Information */}
        <motion.div variants={itemVariants} className="glass p-8 mt-8">
          <h3 className="text-xl font-bold text-white mb-6">Questions About Our Policies?</h3>
          <p className="text-gray-300 mb-6">
            If you have any questions about our privacy policy, terms of service, or cookie policy, 
            please contact our support team.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Download Full Policy
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PrivacyTerms