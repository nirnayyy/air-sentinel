import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Accessibility, 
  Eye, 
  Ear, 
  MousePointer, 
  Keyboard, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Palette,
  Type,
  Volume2,
  ZoomIn,
  Contrast,
  Braille
} from 'lucide-react'

const AccessibilityPage = () => {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [screenReader, setScreenReader] = useState(false)

  const features = [
    {
      category: "Visual Accessibility",
      icon: Eye,
      features: [
        { name: "High Contrast Mode", status: "Available", description: "Enhanced contrast for better visibility" },
        { name: "Font Size Adjustment", status: "Available", description: "Customizable text sizing up to 200%" },
        { name: "Color Blind Support", status: "Available", description: "Alternative color schemes for color vision deficiency" },
        { name: "Focus Indicators", status: "Available", description: "Clear visual focus indicators for navigation" }
      ]
    },
    {
      category: "Motor Accessibility",
      icon: MousePointer,
      features: [
        { name: "Keyboard Navigation", status: "Available", description: "Full keyboard support for all functions" },
        { name: "Large Click Targets", status: "Available", description: "Minimum 44px touch targets for easy interaction" },
        { name: "Voice Control", status: "Planned", description: "Voice commands for hands-free navigation" },
        { name: "Switch Navigation", status: "Available", description: "Support for assistive switch devices" }
      ]
    },
    {
      category: "Cognitive Accessibility",
      icon: Accessibility,
      features: [
        { name: "Simple Language", status: "Available", description: "Clear, jargon-free content throughout" },
        { name: "Consistent Navigation", status: "Available", description: "Predictable navigation patterns" },
        { name: "Progress Indicators", status: "Available", description: "Clear progress feedback for all actions" },
        { name: "Error Prevention", status: "Available", description: "Helpful error messages and validation" }
      ]
    },
    {
      category: "Auditory Accessibility",
      icon: Ear,
      features: [
        { name: "Visual Alerts", status: "Available", description: "Visual alternatives to audio notifications" },
        { name: "Captions", status: "Planned", description: "Closed captions for video content" },
        { name: "Transcripts", status: "Available", description: "Text transcripts for audio content" },
        { name: "Vibration Feedback", status: "Mobile Only", description: "Haptic feedback for mobile users" }
      ]
    }
  ]

  const guidelines = [
    {
      title: "WCAG 2.1 AA Compliance",
      description: "We follow Web Content Accessibility Guidelines 2.1 at the AA level",
      status: "Compliant",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Section 508 Compliance",
      description: "Meets US federal accessibility standards for government websites",
      status: "Compliant",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "ADA Compliance",
      description: "Follows Americans with Disabilities Act guidelines for digital accessibility",
      status: "Compliant",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "EN 301 549 Compliance",
      description: "European accessibility standard for public sector websites",
      status: "In Progress",
      icon: AlertTriangle,
      color: "orange"
    }
  ]

  const assistiveTechnologies = [
    {
      name: "Screen Readers",
      technologies: ["NVDA", "JAWS", "VoiceOver", "TalkBack"],
      support: "Full Support"
    },
    {
      name: "Voice Control",
      technologies: ["Dragon NaturallySpeaking", "Voice Control (macOS)", "Voice Access (Android)"],
      support: "Full Support"
    },
    {
      name: "Switch Navigation",
      technologies: ["Switch Control (iOS)", "Switch Access (Android)", "External switches"],
      support: "Full Support"
    },
    {
      name: "Magnification",
      technologies: ["ZoomText", "MAGic", "Browser zoom", "OS magnification"],
      support: "Full Support"
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
              <Accessibility className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Accessibility
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Committed to making air quality information accessible to everyone, regardless of ability
          </p>
        </motion.div>

        {/* Quick Access Tools */}
        <motion.div variants={itemVariants} className="glass p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Access Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Type className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Font Size</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="p-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                  <ZoomIn className="h-4 w-4 rotate-180" />
                </button>
                <span className="text-gray-300 text-sm">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="p-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Contrast className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">High Contrast</span>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  highContrast 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {highContrast ? 'On' : 'Off'}
              </button>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Volume2 className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Screen Reader</span>
              </div>
              <button
                onClick={() => setScreenReader(!screenReader)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  screenReader 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {screenReader ? 'On' : 'Off'}
              </button>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Settings className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">More Options</span>
              </div>
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm transition-colors">
                Customize
              </button>
            </div>
          </div>
        </motion.div>

        {/* Accessibility Features */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8">Accessibility Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <div key={categoryIndex} className="glass p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{feature.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            feature.status === 'Available' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          }`}>
                            {feature.status}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Compliance Standards */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8">Compliance Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guidelines.map((guideline, index) => {
              const Icon = guideline.icon
              return (
                <div key={index} className="glass p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      guideline.color === 'green' ? 'bg-green-500/20' : 'bg-orange-500/20'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        guideline.color === 'green' ? 'text-green-400' : 'text-orange-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{guideline.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          guideline.color === 'green'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        }`}>
                          {guideline.status}
                        </span>
                      </div>
                      <p className="text-gray-300">{guideline.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Assistive Technology Support */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8">Assistive Technology Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assistiveTechnologies.map((tech, index) => (
              <div key={index} className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-medium">
                    {tech.support}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm mb-3">Supported technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.technologies.map((technology, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Keyboard Shortcuts */}
        <motion.div variants={itemVariants} className="glass p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Keyboard Shortcuts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'Tab', action: 'Navigate between elements' },
              { key: 'Enter', action: 'Activate buttons and links' },
              { key: 'Space', action: 'Toggle checkboxes and buttons' },
              { key: 'Esc', action: 'Close modals and menus' },
              { key: 'Ctrl + /', action: 'Show keyboard shortcuts' },
              { key: 'Ctrl + +', action: 'Increase font size' },
              { key: 'Ctrl + -', action: 'Decrease font size' },
              { key: 'Ctrl + 0', action: 'Reset font size' },
              { key: 'Alt + H', action: 'Go to home page' }
            ].map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <kbd className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm font-mono">
                  {shortcut.key}
                </kbd>
                <span className="text-gray-300 text-sm">{shortcut.action}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div variants={itemVariants} className="glass p-8">
          <h2 className="text-xl font-bold text-white mb-6">Accessibility Feedback</h2>
          <p className="text-gray-300 mb-6">
            We're committed to continuous improvement. If you encounter any accessibility barriers 
            or have suggestions for improvement, please let us know.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              Report Accessibility Issue
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Request Feature
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Accessibility Statement
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AccessibilityPage