import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import { NavbarProvider, useNavbar } from './contexts/NavbarContext'

// Core Pages
import Home from './pages/Home'
import HomeEnhanced from './pages/HomeEnhanced'
import Forecast from './pages/Forecast'
import About from './pages/About'

// Data & Methodology Pages
import DataSources from './pages/DataSources'
import Methodology from './pages/Methodology'

// Dashboard & Analysis Pages
import ForecastDashboard from './pages/ForecastDashboard'
import HistoricalAnalysis from './pages/HistoricalAnalysis'

// Technical Pages
import ModelInfo from './pages/ModelInfo'
import DataDownload from './pages/DataDownload'

// User Experience Pages
import UserDashboard from './pages/UserDashboard'
import AlertsNotifications from './pages/AlertsNotifications'
import HelpDocumentation from './pages/HelpDocumentation'
import ResearchAbout from './pages/ResearchAbout'

// Utility Pages
import ComparisonTools from './pages/ComparisonTools'
import MobileApp from './pages/MobileApp'
import NewsUpdates from './pages/NewsUpdates'
import ContactSupport from './pages/ContactSupport'
import PrivacyTerms from './pages/PrivacyTerms'
import Accessibility from './pages/Accessibility'

function AppContent() {
  const location = useLocation();
  const { isNavbarVisible } = useNavbar();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-space-dark relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/30 via-gray-900/30 to-black/30"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(40,40,40,0.4),transparent_50%)]"></div>
      
      <Navbar isVisible={!isHomePage || isNavbarVisible} />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomeEnhanced />} />
            <Route path="/original" element={<Home />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/about" element={<About />} />
            
            {/* Data & Methodology */}
            <Route path="/data-sources" element={<DataSources />} />
            <Route path="/methodology" element={<Methodology />} />
            
            {/* Dashboard & Analysis */}
            <Route path="/dashboard" element={<ForecastDashboard />} />
            <Route path="/historical-analysis" element={<HistoricalAnalysis />} />
            
            {/* Technical Pages */}
            <Route path="/model-info" element={<ModelInfo />} />
            <Route path="/data-download" element={<DataDownload />} />
            
            {/* User Experience */}
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/alerts" element={<AlertsNotifications />} />
            <Route path="/help" element={<HelpDocumentation />} />
            <Route path="/research" element={<ResearchAbout />} />
            
            {/* Utility Pages */}
            <Route path="/comparison" element={<ComparisonTools />} />
            <Route path="/mobile" element={<MobileApp />} />
            <Route path="/news" element={<NewsUpdates />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/privacy" element={<PrivacyTerms />} />
            <Route path="/accessibility" element={<Accessibility />} />
          </Routes>
        </motion.main>
        
        <Footer />
      </div>
  )
}

function App() {
  return (
    <NavbarProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppContent />
      </Router>
    </NavbarProvider>
  )
}

export default App

