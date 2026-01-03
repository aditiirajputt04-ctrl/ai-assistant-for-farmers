
export type Language = 'en' | 'hi' | 'mr';

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  rainfall: string;
  location: string;
  forecast: Array<{
    day: string;
    temp: number;
    icon: string;
  }>;
}

export interface MandiPrice {
  id: string;
  crop: string;
  mandi: string;
  state: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  updatedAt: string;
}

export interface FarmRecord {
  id: string;
  cropName: string;
  sowingDate: string;
  harvestDate: string;
  quantity: number;
  expenses: number;
  income: number;
}

export type AppTab = 'home' | 'weather' | 'prices' | 'records';
