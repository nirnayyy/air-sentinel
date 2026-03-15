import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  HelpCircle,
  Bug,
  Lightbulb,
  FileText
} from 'lucide-react'

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    { id: 'general', name: 'General Inquiry', icon: MessageSquare },
    { id: 'technical', name: 'Technical Support', icon: Bug },
    { id: 'data', name: 'Data Request', icon: FileText },
    { id: 'feedback', name: 'Feedback', icon: Lightbulb },
    { id: 'bug', name: 'Bug Report', icon: AlertTriangle }
  ]

  const faqs = [
    {
      question: "How often is the air quality data updated?",
      answer: "Our air quality data is updated in real-time from multiple sources including ground monitoring stations, satellite data, and meteorological models."
    },
    {
      question: "How accurate are the air quality predictions?",
      answer: "Our XGBoost model achieves 94.2% accuracy in predicting O3 and NO2 concentrations for the next 24 hours."
    },
    {
      question: "Can I download the raw data?",
      answer: "Yes, you can access and download raw data through our API or data download section. Contact us for bulk data requests."
    },
    {
      question: "How do I interpret the AQI values?",
      answer: "AQI (Air Quality Index) ranges from 0-500. Values 0-50 are Good, 51-100 Moderate, 101-150 Unhealthy for Sensitive Groups, 151-200 Unhealthy."
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', category: 'general', message: '' })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
                  <MessageSquare className="h-10 w-10 text-blue-300 relative z-10" />
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
                  Contact & Support
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
              Get in touch with our team for technical support, data requests, or general inquiries
            </motion.p>
          </div>
          <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
          <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300 mb-6">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="Please describe your inquiry in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
              </div>
            </div>
          </motion.div>

          {/* Contact Info & FAQ */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Information */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-300 text-sm">support@isroairsentinel.gov.in</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <div className="text-gray-300 text-sm">+91-11-2569-0000</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Address</div>
                    <div className="text-gray-300 text-sm">
                      ISRO Headquarters<br />
                      Antariksh Bhavan, New BEL Road<br />
                      Bangalore - 560231, India
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Support Hours</div>
                    <div className="text-gray-300 text-sm">Mon-Fri: 9:00 AM - 6:00 PM IST</div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white hover:text-blue-400 transition-colors">
                      <span className="font-medium">{faq.question}</span>
                      <HelpCircle className="h-4 w-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="text-gray-300 text-sm mt-2 pl-4">{faq.answer}</p>
                  </details>
                ))}
              </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
              </div>
              <div className="relative z-10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Response Times</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">General Inquiry</span>
                  <span className="text-blue-400 font-medium">24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Technical Support</span>
                  <span className="text-green-400 font-medium">12 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Bug Reports</span>
                  <span className="text-orange-400 font-medium">6 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Data Requests</span>
                  <span className="text-purple-400 font-medium">48 hours</span>
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

export default ContactSupport