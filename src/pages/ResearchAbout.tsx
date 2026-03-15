import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Trophy, FileText, Award, Globe, Target, CheckCircle, Zap, BarChart3, Cpu, TrendingUp } from 'lucide-react'

const ResearchAbout = () => {
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

  const researchAreas = [
    {
      title: "Air Quality Modeling",
      description: "Advanced machine learning approaches for atmospheric pollution prediction",
      icon: Target,
      details: [
        "Ensemble modeling (XGBoost + LightGBM + Random Forest)",
        "Multi-source data fusion",
        "Temporal feature engineering",
        "Real-time prediction systems"
      ]
    },
    {
      title: "Satellite Data Analysis",
      description: "Processing and analysis of space-based atmospheric observations",
      icon: Globe,
      details: [
        "Sentinel-5P TROPOMI data",
        "MODIS aerosol products",
        "VIIRS night-time observations",
        "Data quality assessment"
      ]
    },
    {
      title: "Environmental Impact",
      description: "Assessing the health and environmental effects of air pollution",
      icon: Award,
      details: [
        "Health impact assessment",
        "Policy recommendations",
        "Public awareness initiatives",
        "Scientific publications"
      ]
    },
    {
      title: "Technology Innovation",
      description: "Developing cutting-edge solutions for environmental monitoring",
      icon: Cpu,
      details: [
        "Real-time data processing",
        "Cloud computing infrastructure",
        "Mobile applications",
        "API development"
      ]
    }
  ]

  const teamMembers = [
    {
      name: "Dr. Research Lead",
      role: "Principal Investigator",
      expertise: "Atmospheric Science",
      icon: Users
    },
    {
      name: "ML Engineer",
      role: "Machine Learning Specialist",
      expertise: "Data Science & AI",
      icon: BarChart3
    },
    {
      name: "Data Scientist",
      role: "Environmental Data Analyst",
      expertise: "Satellite Data Processing",
      icon: TrendingUp
    },
    {
      name: "Software Developer",
      role: "Full-Stack Developer",
      expertise: "Web Applications",
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
                  <BookOpen className="h-10 w-10 text-blue-300 relative z-10" />
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
                  Research & About
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
              Research publications, team information, and project background
            </motion.p>
            <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-16 right-12 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-ping"></div>
            <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          </div>
        </motion.div>

        {/* Research Areas */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-400/40 rounded-xl">
                        <Icon className="h-6 w-6 text-blue-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                          {area.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">{area.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {area.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => {
              const Icon = member.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
                    <div className="p-4 bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-400/40 rounded-xl inline-block mb-4">
                      <Icon className="h-8 w-8 text-blue-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-400 text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-gray-300 text-xs">{member.expertise}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative z-10 p-8 text-center">
            <motion.div
              className="relative mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6 bg-gradient-to-br from-blue-500/30 to-blue-500/30 border border-blue-400/40 rounded-2xl inline-block">
                <FileText className="h-16 w-16 text-blue-300 mx-auto" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full"
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
            <h2 className="text-3xl font-bold text-white mb-4">Advanced Research Features Coming Soon</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Enhanced research documentation and team information features are under development
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3">Research Features</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span>Research publications database</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-blue-400" />
                    <span>Awards and recognition</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-blue-400" />
                    <span>Project milestones</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-blue-400" />
                    <span>International collaborations</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3">Team Information</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span>Detailed team profiles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Expertise areas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Contact information</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Research interests</span>
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

export default ResearchAbout
