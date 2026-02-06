
import React from 'react';
import { TileData } from '../types';

interface TileProps {
  data: TileData;
  onClick: () => void;
  gridHeight: number;
  gridWidth: number;
}

const Tile: React.FC<TileProps> = ({ data, onClick, gridHeight, gridWidth }) => {
  // 定义鲜艳且具有辨识度的颜色方案
  const COLORS: Record<number, { bg: string, border: string, text: string }> = {
    1: { bg: 'bg-blue-500', border: 'border-blue-700', text: 'text-white' },
    2: { bg: 'bg-emerald-500', border: 'border-emerald-700', text: 'text-white' },
    3: { bg: 'bg-amber-500', border: 'border-amber-700', text: 'text-white' },
    4: { bg: 'bg-rose-500', border: 'border-rose-700', text: 'text-white' },
    5: { bg: 'bg-indigo-500', border: 'border-indigo-700', text: 'text-white' },
    6: { bg: 'bg-violet-500', border: 'border-violet-700', text: 'text-white' },
    7: { bg: 'bg-cyan-500', border: 'border-cyan-700', text: 'text-white' },
    8: { bg: 'bg-orange-500', border: 'border-orange-700', text: 'text-white' },
    9: { bg: 'bg-slate-600', border: 'border-slate-800', text: 'text-white' },
  };

  const theme = COLORS[data.value] || COLORS[9];

  // 计算位置百分比 (row 0 在底部)
  const topPercent = (gridHeight - 1 - data.row) * (100 / gridHeight);
  const leftPercent = data.col * (100 / gridWidth);

  return (
    <div 
      className="absolute p-1 transition-all duration-300 ease-out z-20"
      style={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        width: `${100 / gridWidth}%`,
        height: `${100 / gridHeight}%`,
        transform: data.isSelected ? 'scale(1.1) rotate(2deg)' : 'scale(1)',
      }}
    >
      <button 
        onClick={onClick}
        className={`w-full h-full rounded-xl border-b-4 flex items-center justify-center text-2xl font-black shadow-lg transition-all active:scale-95 active:border-b-0 active:translate-y-1 ${
          data.isSelected 
            ? 'bg-white text-indigo-600 border-slate-300 ring-4 ring-indigo-400 z-30' 
            : `${theme.bg} ${theme.text} ${theme.border}`
        }`}
      >
        {data.value}
      </button>
    </div>
  );
};

export default Tile;
