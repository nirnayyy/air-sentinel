import { useState, useEffect, useCallback } from 'react';
import { dataServices, AirQualityData, WeatherData, SatelliteData } from '../services/apiServices';

export interface RealTimeData {
  airQuality: AirQualityData[];
  weather: WeatherData[];
  satellite: SatelliteData[];
  forecast: WeatherData[];
  lastUpdated: string;
  isLoading: boolean;
  error: string | null;
}

export interface DataFetchOptions {
  latitude?: number;
  longitude?: number;
  refreshInterval?: number; // in milliseconds
  enableAutoRefresh?: boolean;
}

export const useRealTimeData = (options: DataFetchOptions = {}) => {
  const {
    latitude = 28.6139,
    longitude = 77.2090,
    refreshInterval = 30000, // 30 seconds
    enableAutoRefresh = true
  } = options;

  const [data, setData] = useState<RealTimeData>({
    airQuality: [],
    weather: [],
    satellite: [],
    forecast: [],
    lastUpdated: '',
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true, error: null }));
      
      const comprehensiveData = await dataServices.aggregation.getComprehensiveData(latitude, longitude);
      
      setData({
        airQuality: comprehensiveData.airQuality,
        weather: comprehensiveData.weather,
        satellite: comprehensiveData.satellite,
        forecast: comprehensiveData.forecast,
        lastUpdated: new Date().toISOString(),
        isLoading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data'
      }));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enableAutoRefresh) return;

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enableAutoRefresh]);

  return {
    ...data,
    refetch: fetchData,
    isOnline: navigator.onLine
  };
};

// Hook for air quality data only
export const useAirQualityData = (refreshInterval: number = 60000) => {
  const [data, setData] = useState<{
    openaq: AirQualityData[];
    cpcb: any[];
    waqi: any[];
    lastUpdated: string;
    isLoading: boolean;
    error: string | null;
  }>({
    openaq: [],
    cpcb: [],
    waqi: [],
    lastUpdated: '',
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true, error: null }));
      
      const airQualityData = await dataServices.aggregation.getAllAirQualityData();
      
      setData({
        ...airQualityData,
        lastUpdated: new Date().toISOString(),
        isLoading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch air quality data'
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    ...data,
    refetch: fetchData
  };
};

// Hook for weather data only
export const useWeatherData = (latitude: number = 28.6139, longitude: number = 77.2090) => {
  const [data, setData] = useState<{
    current: WeatherData | null;
    forecast: WeatherData[];
    lastUpdated: string;
    isLoading: boolean;
    error: string | null;
  }>({
    current: null,
    forecast: [],
    lastUpdated: '',
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true, error: null }));
      
      const forecastData = await dataServices.ncmrwf.getWeatherForecast(latitude, longitude);
      
      setData({
        current: forecastData[0] || null,
        forecast: forecastData,
        lastUpdated: new Date().toISOString(),
        isLoading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch weather data'
      }));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    ...data,
    refetch: fetchData
  };
};

// Hook for satellite data only
export const useSatelliteData = () => {
  const [data, setData] = useState<{
    insat: SatelliteData[];
    lastUpdated: string;
    isLoading: boolean;
    error: string | null;
  }>({
    insat: [],
    lastUpdated: '',
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true, error: null }));
      
      const satelliteData = await dataServices.mosdac.getINSATData();
      
      setData({
        insat: satelliteData,
        lastUpdated: new Date().toISOString(),
        isLoading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch satellite data'
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 600000); // 10 minutes
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    ...data,
    refetch: fetchData
  };
};

