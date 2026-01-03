
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  CloudSun, 
  TrendingUp, 
  ClipboardList, 
  Menu, 
  Bell,
  Plus,
  ArrowRight,
  ChevronRight,
  Wheat,
  Calendar,
  IndianRupee,
  Database,
  // Fix: Import missing Trash2 icon
  Trash2
} from 'lucide-react';
import { TRANSLATIONS, MOCK_WEATHER, MOCK_PRICES } from './constants';
import { Language, AppTab, FarmRecord } from './types';
import LanguageSelector from './components/LanguageSelector';
import WeatherCard from './components/WeatherCard';
import MandiRow from './components/MandiRow';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [records, setRecords] = useState<FarmRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<FarmRecord>>({});

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const saved = localStorage.getItem('kisan_records');
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  const saveRecord = () => {
    if (!newRecord.cropName) return;
    const record: FarmRecord = {
      id: Date.now().toString(),
      cropName: newRecord.cropName || '',
      sowingDate: newRecord.sowingDate || new Date().toISOString().split('T')[0],
      harvestDate: newRecord.harvestDate || '',
      quantity: Number(newRecord.quantity) || 0,
      expenses: Number(newRecord.expenses) || 0,
      income: Number(newRecord.income) || 0,
    };
    const updated = [...records, record];
    setRecords(updated);
    localStorage.setItem('kisan_records', JSON.stringify(updated));
    setShowAddModal(false);
    setNewRecord({});
  };

  const deleteRecord = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    localStorage.setItem('kisan_records', JSON.stringify(updated));
  };

  const renderHome = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <WeatherCard {...MOCK_WEATHER} lang={lang} />
      
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xl font-black text-gray-800">{t.topPrices}</h3>
        <button onClick={() => setActiveTab('prices')} className="text-green-700 font-bold flex items-center text-sm">
          {t.prices} <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="space-y-3">
        {MOCK_PRICES.slice(0, 3).map(item => (
          <MandiRow key={item.id} item={item} />
        ))}
      </div>

      <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-center justify-between">
        <div>
          <h4 className="text-orange-900 font-black text-lg">{t.records}</h4>
          <p className="text-orange-700 text-xs font-medium">{records.length} {t.recentRecords}</p>
        </div>
        <button 
          onClick={() => setActiveTab('records')}
          className="bg-orange-500 text-white p-3 rounded-2xl shadow-lg shadow-orange-200"
        >
          <Database size={24} />
        </button>
      </div>
    </div>
  );

  const renderWeather = () => (
    <div className="space-y-6">
      <WeatherCard {...MOCK_WEATHER} lang={lang} />
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-500/10">
        <h3 className="text-lg font-black text-gray-800 mb-6">{t.forecast}</h3>
        <div className="flex justify-between">
          {MOCK_WEATHER.forecast.map((f, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase">{f.day}</p>
              <div className="bg-green-50 p-3 rounded-2xl">
                <CloudSun className="w-8 h-8 text-green-600" />
              </div>
              <p className="font-black text-gray-800">{f.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrices = () => (
    <div className="space-y-4">
      <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
        {['Wheat', 'Rice', 'Onion', 'Potato', 'Cotton'].map((c) => (
          <button key={c} className="whitespace-nowrap bg-white px-4 py-2 rounded-full border border-green-200 text-sm font-bold text-green-800">
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {MOCK_PRICES.map(item => (
          <MandiRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-gray-800">{t.records}</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-2xl font-bold flex items-center space-x-2 shadow-lg"
        >
          <Plus size={20} />
          <span>{t.addRecord}</span>
        </button>
      </div>

      {records.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl text-center border-2 border-dashed border-gray-200 mt-10">
          <Database size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-bold">{t.noRecords}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map(record => (
            <div key={record.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-black text-lg text-green-800">{record.cropName}</h4>
                  <div className="flex items-center text-xs text-gray-400 font-bold mt-1 space-x-3">
                    <span className="flex items-center"><Calendar size={12} className="mr-1" /> {record.sowingDate}</span>
                    <span className="flex items-center"><Wheat size={12} className="mr-1" /> {record.quantity} kg</span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteRecord(record.id)}
                  className="text-red-400 p-2 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50">
                <div className="bg-red-50/50 p-2 rounded-2xl">
                  <p className="text-[10px] text-red-400 font-bold uppercase">{t.expenses}</p>
                  <p className="font-black text-red-700">₹{record.expenses}</p>
                </div>
                <div className="bg-green-50/50 p-2 rounded-2xl">
                  <p className="text-[10px] text-green-400 font-bold uppercase">{t.income}</p>
                  <p className="font-black text-green-700">₹{record.income}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-[#f8faf8] relative">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center sticky top-0 bg-[#f8faf8]/80 backdrop-blur-md z-30">
        <h1 className="text-2xl font-black text-green-900 tracking-tight">{t.appName}</h1>
        <div className="flex items-center space-x-3">
          <LanguageSelector current={lang} onSelect={setLang} />
          <button className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100 text-gray-600">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'weather' && renderWeather()}
        {activeTab === 'prices' && renderPrices()}
        {activeTab === 'records' && renderRecords()}
      </main>

      {/* Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-3 safe-bottom z-40 flex justify-between items-center shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center p-2 rounded-2xl transition-all ${activeTab === 'home' ? 'text-green-700 bg-green-50' : 'text-gray-400'}`}
        >
          <Home size={24} className={activeTab === 'home' ? 'fill-current' : ''} />
          <span className="text-[10px] font-bold mt-1 uppercase">{t.home}</span>
        </button>
        <button 
          onClick={() => setActiveTab('weather')}
          className={`flex flex-col items-center p-2 rounded-2xl transition-all ${activeTab === 'weather' ? 'text-green-700 bg-green-50' : 'text-gray-400'}`}
        >
          <CloudSun size={24} />
          <span className="text-[10px] font-bold mt-1 uppercase">{t.weather}</span>
        </button>
        <button 
          onClick={() => setActiveTab('prices')}
          className={`flex flex-col items-center p-2 rounded-2xl transition-all ${activeTab === 'prices' ? 'text-green-700 bg-green-50' : 'text-gray-400'}`}
        >
          <TrendingUp size={24} />
          <span className="text-[10px] font-bold mt-1 uppercase">{t.prices}</span>
        </button>
        <button 
          onClick={() => setActiveTab('records')}
          className={`flex flex-col items-center p-2 rounded-2xl transition-all ${activeTab === 'records' ? 'text-green-700 bg-green-50' : 'text-gray-400'}`}
        >
          <ClipboardList size={24} />
          <span className="text-[10px] font-bold mt-1 uppercase">{t.records}</span>
        </button>
      </nav>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-t-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-gray-800">{t.addRecord}</h3>
              <button onClick={() => setShowAddModal(false)} className="bg-gray-100 p-2 rounded-full text-gray-400">
                <Plus size={20} className="rotate-45" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-1 block">{t.cropName}</label>
                <input 
                  type="text" 
                  placeholder="Wheat, Rice, etc."
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-green-500 font-bold"
                  onChange={e => setNewRecord({...newRecord, cropName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-1 block">{t.sowingDate}</label>
                  <input 
                    type="date" 
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-green-500 font-bold"
                    onChange={e => setNewRecord({...newRecord, sowingDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-1 block">{t.quantity}</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-green-500 font-bold"
                    onChange={e => setNewRecord({...newRecord, quantity: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-1 block">{t.expenses}</label>
                  <input 
                    type="number" 
                    placeholder="₹ 0"
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-green-500 font-bold"
                    onChange={e => setNewRecord({...newRecord, expenses: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-1 block">{t.income}</label>
                  <input 
                    type="number" 
                    placeholder="₹ 0"
                    className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-green-500 font-bold"
                    onChange={e => setNewRecord({...newRecord, income: Number(e.target.value)})}
                  />
                </div>
              </div>

              <button 
                onClick={saveRecord}
                className="w-full bg-green-700 text-white p-5 rounded-3xl font-black text-lg shadow-xl shadow-green-100 mt-4 active:scale-95 transition-all"
              >
                {t.save}
              </button>
            </div>
            <div className="h-8" /> {/* Safe area spacer */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
