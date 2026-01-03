
import React from 'react';
import { Sun, CloudRain, Cloud, Thermometer, Droplets, Wind } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface Props {
  temp: number;
  condition: string;
  humidity: number;
  rainfall: string;
  location: string;
  lang: Language;
}

const WeatherCard: React.FC<Props> = ({ temp, condition, humidity, rainfall, location, lang }) => {
  const t = TRANSLATIONS[lang];
  
  return (
    <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-6 rounded-3xl shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm opacity-80 uppercase font-bold tracking-wider">{t.todayTemp}</h2>
          <p className="text-4xl font-black mt-1">{temp}°C</p>
          <p className="text-lg opacity-90 mt-1 font-medium">{location}</p>
        </div>
        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
          <Sun className="w-12 h-12 text-yellow-300" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white/10 p-3 rounded-2xl flex items-center space-x-3">
          <Droplets className="w-5 h-5 text-blue-200" />
          <div>
            <p className="text-[10px] opacity-70 uppercase font-bold">{t.humidity}</p>
            <p className="font-bold">{humidity}%</p>
          </div>
        </div>
        <div className="bg-white/10 p-3 rounded-2xl flex items-center space-x-3">
          <CloudRain className="w-5 h-5 text-blue-200" />
          <div>
            <p className="text-[10px] opacity-70 uppercase font-bold">{t.rainfall}</p>
            <p className="font-bold">{rainfall}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
