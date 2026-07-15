# 🌬️ Air Sentinel

> **Interactive Air Quality Forecasting & Meteorological Analytics Dashboard**  
> A predictive air quality tracking system that leverages machine learning forecasting models and meteorological data to provide real-time air quality index (AQI) monitoring, historical trends, and location-based alerts.

<p align="center">
  <img src="https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20TailwindCSS-10b981?style=flat-square" alt="Tech Stack">
  <img src="https://img.shields.io/badge/Bundler-Vite-blue?style=flat-square" alt="Bundler">
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?style=flat-square" alt="Deployment">
</p>

---

## 🌍 Overview

Air Sentinel is a full-featured meteorological dashboard designed to make air quality predictions understandable and actionable. The application interfaces with weather and particulate sensors, runs predictive ML models, and displays structured forecasts through interactive visualizations.

```
       ┌────────────────────────┐      ┌────────────────────────┐
       │   Historical Weather   │      │  Sensor Readings API   │
       │     & Satellite API    │      │ (Particulates PM2.5/10)│
       └───────────┬────────────┘      └───────────┬────────────┘
                   │                               │
                   └───────────────┬───────────────┘
                                   ▼
                       ┌──────────────────────┐
                       │  ML Forecasting Model│
                       └───────────┬──────────┘
                                   ▼
                       ┌──────────────────────┐
                       │   Vite + React App   │
                       │ (Dashboard / Alerts) │
                       └──────────────────────┘
```

---

## 🚀 Key Dashboard Pages

* **Forecast Dashboard:** Interactive line and heat charts predicting PM2.5, PM10, CO, NO2, and Ozone levels for the next 7 days.
* **Historical Analysis:** Comparative graphs illustrating air quality variations across seasons, years, and specific regions.
* **Model Information:** Transparency logs breaking down training attributes, test accuracy, and model hyperparameters for the predictive engine.
* **Alerts & Notifications:** Client-side triggers enabling users to configure automated warnings when AQI crosses safety thresholds.
* **Comparison Tools:** Compare air metrics side-by-side between different cities or monitoring stations.

---

## 💻 Tech Stack & Dependencies

* **Frontend Framework:** React 18 with TypeScript
* **Build System:** Vite
* **Styling:** Tailwind CSS + Framer Motion (for polished micro-animations and route transitions)
* **Routing:** React Router DOM (Single Page Application architecture)
* **Data Visualization:** Chart.js / Recharts (dynamic meteorological tracking)

---

## 📂 Project Structure

```
├── public/                 # Static assets (icons, maps, graphs)
├── src/
│   ├── components/         # Shared components (Navbar, Footer, Spinner, Card)
│   ├── contexts/           # Context providers (NavbarState, AuthState)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # API helpers and data parsers
│   ├── pages/              # Main view components
│   │   ├── Home.tsx        # Dashboard landing
│   │   ├── Forecast.tsx    # Predictive layouts
│   │   ├── ModelInfo.tsx   # Model metadata
│   │   └── ...             # Core pages (Alerts, DataSources, Methodology)
│   ├── services/           # Analytics calculation services
│   ├── App.tsx             # Main routing entrypoint
│   ├── index.css           # Styling configuration
│   └── main.tsx            # DOM mounting
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Local Development Setup

Ensure you have Node.js (version 18 or higher) installed on your machine.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nirnayyy/air-sentinel.git
   cd air-sentinel
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
