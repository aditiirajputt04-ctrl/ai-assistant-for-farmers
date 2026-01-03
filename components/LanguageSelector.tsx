
import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ current, onSelect }) => {
  return (
    <div className="flex space-x-2 bg-green-800/20 p-1 rounded-full border border-green-800/10">
      {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onSelect(lang)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            current === lang 
              ? 'bg-green-700 text-white shadow-md' 
              : 'text-green-900'
          }`}
        >
          {lang === 'en' ? 'ENG' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
