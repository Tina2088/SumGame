
import React from 'react';
import { GameMode, Language, TRANSLATIONS } from '../types';

interface MenuProps {
  lang: Language;
  onStart: (mode: GameMode) => void;
  highScore: number;
}

const Menu: React.FC<MenuProps> = ({ lang, onStart, highScore }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center">
        <div className="w-24 h-24 bg-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg transform rotate-3 animate-float">
          <span className="text-2xl text-white font-black tracking-tighter">Tina</span>
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-2">{t.title}</h2>
        <p className="text-slate-500 font-medium">{t.classicDesc}</p>
      </div>

      <div className="w-full space-y-4">
        <button 
          onClick={() => onStart(GameMode.CLASSIC)}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all flex flex-col items-center"
        >
          <span>{t.classic}</span>
          <span className="text-xs font-normal opacity-80 uppercase tracking-widest mt-1">Endless Survival</span>
        </button>

        <button 
          onClick={() => onStart(GameMode.TIME)}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all flex flex-col items-center"
        >
          <span>{t.time}</span>
          <span className="text-xs font-normal opacity-80 uppercase tracking-widest mt-1">Countdown Challenge</span>
        </button>
      </div>

      <div className="pt-4 text-center">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t.highScore}</div>
        <div className="text-2xl font-black text-slate-700">{highScore}</div>
      </div>
    </div>
  );
};

export default Menu;
