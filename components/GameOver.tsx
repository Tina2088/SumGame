
import React from 'react';
import { Language, TRANSLATIONS } from '../types';

interface GameOverProps {
  score: number;
  highScore: number;
  lang: Language;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, highScore, lang, onRestart }) => {
  const t = TRANSLATIONS[lang];
  const isNewRecord = score > 0 && score >= highScore;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white space-y-8 animate-in zoom-in slide-in-from-bottom-8 duration-500">
      <div className="text-center">
        <div className="text-6xl mb-4">💥</div>
        <h2 className="text-4xl font-black text-slate-800 mb-2">{t.gameOver}</h2>
        {isNewRecord && (
          <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-black rounded-full uppercase tracking-widest mb-4">
            New Record!
          </div>
        )}
      </div>

      <div className="w-full bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col items-center shadow-inner">
        <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{t.score}</div>
        <div className="text-6xl font-black text-slate-800 mb-6">{score}</div>
        
        <div className="w-full h-[1px] bg-slate-200 mb-6"></div>
        
        <div className="flex justify-between w-full text-slate-500 font-bold px-4">
          <span>{t.highScore}:</span>
          <span>{highScore}</span>
        </div>
      </div>

      <button 
        onClick={onRestart}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
      >
        {t.restart}
      </button>

      <button 
        onClick={onRestart}
        className="text-indigo-600 font-bold text-sm hover:underline"
      >
        {t.back}
      </button>
    </div>
  );
};

export default GameOver;
