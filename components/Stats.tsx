
import React, { useMemo } from 'react';
import { GameState, Language, TRANSLATIONS, GameMode } from '../types';

interface StatsProps {
  state: GameState;
  lang: Language;
}

const Stats: React.FC<StatsProps> = ({ state, lang }) => {
  const t = TRANSLATIONS[lang];
  
  const currentSum = useMemo(() => {
    return state.grid.filter(t => t.isSelected).reduce((acc, curr) => acc + curr.value, 0);
  }, [state.grid]);

  return (
    <div className="p-6 bg-slate-50 grid grid-cols-2 gap-4 border-b border-slate-200">
      {/* Target Number */}
      <div className="col-span-1 bg-white p-3 rounded-2xl shadow-sm border-2 border-indigo-100 flex flex-col items-center justify-center">
        <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{t.target}</span>
        <span className="text-3xl font-black text-indigo-600 leading-none">{state.target}</span>
      </div>

      {/* Current Sum */}
      <div className={`col-span-1 p-3 rounded-2xl shadow-sm border-2 flex flex-col items-center justify-center transition-colors duration-200 ${
        currentSum > state.target ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100'
      }`}>
        <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{t.sum}</span>
        <span className={`text-3xl font-black leading-none ${currentSum > state.target ? 'text-red-500' : 'text-emerald-500'}`}>
          {currentSum}
        </span>
      </div>

      {/* Score */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
        <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{t.score}</span>
        <span className="text-xl font-black text-slate-700">{state.score}</span>
      </div>

      {/* Timer or High Score */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
        {state.mode === GameMode.TIME ? (
          <>
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Time</span>
            <div className={`w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden`}>
              <div 
                className={`h-full transition-all duration-1000 ${state.timeLeft < 5 ? 'bg-red-500' : 'bg-orange-400'}`}
                style={{ width: `${(state.timeLeft / 15) * 100}%` }}
              ></div>
            </div>
            <span className={`text-xl font-black mt-1 ${state.timeLeft < 5 ? 'text-red-500' : 'text-slate-700'}`}>{state.timeLeft}s</span>
          </>
        ) : (
          <>
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{t.highScore}</span>
            <span className="text-xl font-black text-slate-500">{state.highScore}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Stats;
