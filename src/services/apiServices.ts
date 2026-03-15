// API Services for ISRO Air Sentinel
// Integration with various data sources for real-time air quality monitoring

export interface AirQualityData {
  location: string;
  parameter: string;
  value: number;
  unit: string;
  timestamp: string;
  latitude?: number;
  longitude?: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  timestamp: string;
}

export interface SatelliteData {
  no2: number;
  o3: number;
  hcho: number;
  timestamp: string;
  latitude: number;
  longitude: number;
}

// OpenAQ API Service
export class OpenAQService {
  private baseUrl = 'https://api.openaq.org/v2';

  async getLatestMeasurements(country: string = 'IN', limit: number = 100): Promise<AirQualityData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/latest?country=${country}&limit=${limit}`
      );
      const data = await response.json();
      
      return data.results.map((result: any) => ({
        location: result.location,
        parameter: result.parameter,
        value: result.value,
        unit: result.unit,
        timestamp: result.lastUpdated,
        latitude: result.coordinates?.latitude,
        longitude: result.coordinates?.longitude,
      }));
    } catch (error) {
      console.error('Error fetching OpenAQ data:', error);
      return [];
    }
  }

  async getHistoricalData(location: string, parameter: string, dateFrom: string, dateTo: string): Promise<AirQualityData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/measurements?location=${location}&parameter=${parameter}&date_from=${dateFrom}&date_to=${dateTo}&limit=1000`
      );
      const data = await response.json();
      
      return data.results.map((result: any) => ({
        location: result.location,
        parameter: result.parameter,
        value: result.value,
        unit: result.unit,
        timestamp: result.date.utc,
        latitude: result.coordinates?.latitude,
        longitude: result.coordinates?.longitude,
      }));
    } catch (error) {
      console.error('Error fetching OpenAQ historical data:', error);
      return [];
    }
  }
}

// CPCB Air Quality API Service
export class CPCBService {
  private baseUrl = 'https://airquality.cpcb.gov.in/AQI_India';

  async getRealTimeAQI(): Promise<any[]> {
    try {
      // This is a simulated response since CPCB API requires specific authentication
      // In production, you would implement proper authentication and API calls
      return [
        {
          station: 'Delhi - ITO',
          aqi: 156,
          category: 'Unhealthy',
          pm25: 89,
          pm10: 134,
          no2: 45,
          o3: 67,
          timestamp: new Date().toISOString(),
          latitude: 28.6139,
          longitude: 77.2090
        },
        {
          station: 'Delhi - RK Puram',
          aqi: 142,
          category: 'Unhealthy for Sensitive Groups',
          pm25: 78,
          pm10: 121,
          no2: 38,
          o3: 72,
          timestamp: new Date().toISOString(),
          latitude: 28.6139,
          longitude: 77.2090
        }
      ];
    } catch (error) {
      console.error('Error fetching CPCB data:', error);
      return [];
    }
  }
}

// World Air Quality Index API Service
export class WAQIService {
  private baseUrl = 'https://api.waqi.info';
  private token = 'demo'; // In production, use your actual token

  async getCityAQI(city: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/feed/${city}/?token=${this.token}`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        return {
          aqi: data.data.aqi,
          station: data.data.city.name,
          timestamp: data.data.time.iso,
          iaqi: data.data.iaqi,
          coordinates: data.data.city.geo,
          attributions: data.data.attributions
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching WAQI data:', error);
      return null;
    }
  }

  async getStationAQI(stationId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/feed/@{stationId}/?token=${this.token}`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        return {
          aqi: data.data.aqi,
          station: data.data.city.name,
          timestamp: data.data.time.iso,
          iaqi: data.data.iaqi,
          coordinates: data.data.city.geo
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching WAQI station data:', error);
      return null;
    }
  }
}

// Copernicus Climate Data Store API Service (Simulated)
export class CopernicusService {
  async getERA5Data(latitude: number, longitude: number, startDate: string, endDate: string): Promise<WeatherData[]> {
    try {
      // This is a simulated response since Copernicus API requires registration and authentication
      // In production, you would implement proper CDS API integration
      const mockData: WeatherData[] = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      for (let d = new Date(start); d <= end; d.setHours(d.getHours() + 1)) {
        mockData.push({
          temperature: 20 + Math.random() * 15,
          humidity: 40 + Math.random() * 40,
          windSpeed: 5 + Math.random() * 15,
          windDirection: Math.random() * 360,
          pressure: 1000 + Math.random() * 50,
          visibility: 5 + Math.random() * 10,
          timestamp: d.toISOString()
        });
      }
      
      return mockData;
    } catch (error) {
      console.error('Error fetching Copernicus data:', error);
      return [];
    }
  }

  async getCAMSData(latitude: number, longitude: number, startDate: string, endDate: string): Promise<SatelliteData[]> {
    try {
      // Simulated CAMS reanalysis data
      const mockData: SatelliteData[] = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      for (let d = new Date(start); d <= end; d.setHours(d.getHours() + 6)) {
        mockData.push({
          no2: 20 + Math.random() * 40,
          o3: 30 + Math.random() * 50,
          hcho: 10 + Math.random() * 20,
          timestamp: d.toISOString(),
          latitude,
          longitude
        });
      }
      
      return mockData;
    } catch (error) {
      console.error('Error fetching CAMS data:', error);
      return [];
    }
  }
}

// MOSDAC ISRO API Service (Simulated)
export class MOSDACService {
  async getINSATData(): Promise<SatelliteData[]> {
    try {
      // Simulated INSAT-3D/3DR data
      return [
        {
          no2: 25 + Math.random() * 15,
          o3: 45 + Math.random() * 25,
          hcho: 12 + Math.random() * 8,
          timestamp: new Date().toISOString(),
          latitude: 28.6139,
          longitude: 77.2090
        }
      ];
    } catch (error) {
      console.error('Error fetching MOSDAC data:', error);
      return [];
    }
  }
}

// NCMRWF Weather API Service (Simulated)
export class NCMRWFService {
  async getWeatherForecast(latitude: number, longitude: number): Promise<WeatherData[]> {
    try {
      // Simulated NCMRWF forecast data
      const forecast: WeatherData[] = [];
      const now = new Date();
      
      for (let i = 0; i < 24; i++) {
        const time = new Date(now.getTime() + i * 60 * 60 * 1000);
        forecast.push({
          temperature: 22 + Math.sin(i * Math.PI / 12) * 8 + Math.random() * 4,
          humidity: 60 + Math.cos(i * Math.PI / 8) * 20 + Math.random() * 10,
          windSpeed: 8 + Math.random() * 12,
          windDirection: 180 + Math.random() * 180,
          pressure: 1013 + Math.random() * 20,
          visibility: 8 + Math.random() * 7,
          timestamp: time.toISOString()
        });
      }
      
      return forecast;
    } catch (error) {
      console.error('Error fetching NCMRWF data:', error);
      return [];
    }
  }
}

// Main Data Service that aggregates all APIs
export class DataAggregationService {
  private openAQ = new OpenAQService();
  private cpcb = new CPCBService();
  private waqi = new WAQIService();
  private copernicus = new CopernicusService();
  private mosdac = new MOSDACService();
  private ncmrwf = new NCMRWFService();

  async getAllAirQualityData(): Promise<{
    openaq: AirQualityData[];
    cpcb: any[];
    waqi: any[];
  }> {
    try {
      const [openaqData, cpcbData, waqiData] = await Promise.all([
        this.openAQ.getLatestMeasurements('IN'),
        this.cpcb.getRealTimeAQI(),
        this.waqi.getCityAQI('delhi')
      ]);

      return {
        openaq: openaqData,
        cpcb: cpcbData,
        waqi: waqiData ? [waqiData] : []
      };
    } catch (error) {
      console.error('Error aggregating air quality data:', error);
      return { openaq: [], cpcb: [], waqi: [] };
    }
  }

  async getComprehensiveData(latitude: number = 28.6139, longitude: number = 77.2090): Promise<{
    airQuality: any[];
    weather: WeatherData[];
    satellite: SatelliteData[];
    forecast: WeatherData[];
  }> {
    try {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      const [airQualityData, weatherData, satelliteData, forecastData] = await Promise.all([
        this.getAllAirQualityData(),
        this.copernicus.getERA5Data(latitude, longitude, yesterday.toISOString(), now.toISOString()),
        this.mosdac.getINSATData(),
        this.ncmrwf.getWeatherForecast(latitude, longitude)
      ]);

      return {
        airQuality: [...airQualityData.openaq, ...airQualityData.cpcb, ...airQualityData.waqi],
        weather: weatherData,
        satellite: satelliteData,
        forecast: forecastData
      };
    } catch (error) {
      console.error('Error fetching comprehensive data:', error);
      return { airQuality: [], weather: [], satellite: [], forecast: [] };
    }
  }
}

// Air Quality Prediction API Service - ISRO ML Model Backend
export interface Site {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
}

export interface ModelMetrics {
  O3_RMSE: number;
  O3_R2: number;
  O3_RIA: number;
  NO2_RMSE: number;
  NO2_R2: number;
  NO2_RIA: number;
  Avg_RMSE: number;
  Avg_R2: number;
  Avg_RIA: number;
}

export interface SiteMetrics {
  XGBoost: ModelMetrics;
  LightGBM: ModelMetrics;
  RandomForest: ModelMetrics;
  Ensemble: ModelMetrics;
}

export interface PredictionInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  O3_forecast: number;
  NO2_forecast: number;
  T_forecast: number;
  q_forecast: number;
  u_forecast: number;
  v_forecast: number;
  w_forecast: number;
}

export interface Prediction {
  hour: number;
  datetime: string;
  O3_predicted: number;
  NO2_predicted: number;
  model_used: string;
}

export class AirQualityPredictionService {
  private baseUrl = 'http://localhost:5000/api';

  async healthCheck(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', message: 'Backend unavailable' };
    }
  }

  async getSites(): Promise<Site[]> {
    try {
      const response = await fetch(`${this.baseUrl}/sites`);
      const data = await response.json();
      return data.success ? data.sites : [];
    } catch (error) {
      console.error('Error fetching sites:', error);
      return [];
    }
  }

  async getAllMetrics(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/metrics`);
      const data = await response.json();
      return data.success ? data.metrics : null;
    } catch (error) {
      console.error('Error fetching all metrics:', error);
      return null;
    }
  }

  async getSiteMetrics(siteId: number): Promise<SiteMetrics | null> {
    try {
      const response = await fetch(`${this.baseUrl}/metrics/${siteId}`);
      const data = await response.json();
      return data.success ? data.metrics : null;
    } catch (error) {
      console.error(`Error fetching metrics for site ${siteId}:`, error);
      return null;
    }
  }

  async predict(siteId: number, inputData: PredictionInput[]): Promise<Prediction[]> {
    try {
      const response = await fetch(`${this.baseUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          site_id: siteId,
          input_data: inputData
        })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Prediction failed');
      }
      
      return data.predictions;
    } catch (error) {
      console.error('Error making prediction:', error);
      throw error;
    }
  }

  async predictFromCSV(siteId: number, file: File): Promise<Prediction[]> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('site_id', siteId.toString());
      
      const response = await fetch(`${this.baseUrl}/predict/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Prediction failed');
      }
      
      return data.predictions;
    } catch (error) {
      console.error('Error uploading file for prediction:', error);
      throw error;
    }
  }

  async getPredictionHistory(siteId: number): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/predictions/history/${siteId}`);
      const data = await response.json();
      return data.success ? data.predictions : [];
    } catch (error) {
      console.error(`Error fetching prediction history for site ${siteId}:`, error);
      return [];
    }
  }

  // Generate sample input data for 24 hours
  generateSampleInput(date: Date = new Date()): PredictionInput[] {
    const inputs: PredictionInput[] = [];
    
    for (let hour = 0; hour < 24; hour++) {
      inputs.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: hour,
        O3_forecast: 40 + Math.random() * 30, // 40-70 µg/m³
        NO2_forecast: 25 + Math.random() * 25, // 25-50 µg/m³
        T_forecast: 20 + Math.sin(hour * Math.PI / 12) * 8, // Temperature variation
        q_forecast: 8 + Math.random() * 6, // Humidity 8-14 g/kg
        u_forecast: -2 + Math.random() * 4, // Wind u component
        v_forecast: -2 + Math.random() * 4, // Wind v component
        w_forecast: -0.1 + Math.random() * 0.2 // Wind w component
      });
    }
    
    return inputs;
  }
}

// Export service instances
export const dataServices = {
  openaq: new OpenAQService(),
  cpcb: new CPCBService(),
  waqi: new WAQIService(),
  copernicus: new CopernicusService(),
  mosdac: new MOSDACService(),
  ncmrwf: new NCMRWFService(),
  aggregation: new DataAggregationService(),
  prediction: new AirQualityPredictionService()
};

