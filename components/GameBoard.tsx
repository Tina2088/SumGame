
import React from 'react';
import { TileData } from '../types';
import Tile from './Tile';

interface GameBoardProps {
  grid: TileData[];
  onSelect: (id: string) => void;
  maxRows: number;
  maxCols: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ grid, onSelect, maxRows, maxCols }) => {
  const cells = [];
  // 渲染背景装饰网格
  for (let r = 0; r < maxRows; r++) {
    for (let c = 0; c < maxCols; c++) {
      cells.push(
        <div 
          key={`bg-${r}-${c}`}
          className="absolute border-[0.5px] border-slate-100 pointer-events-none"
          style={{
            width: `${100 / maxCols}%`,
            height: `${100 / maxRows}%`,
            left: `${c * (100 / maxCols)}%`,
            top: `${(maxRows - 1 - r) * (100 / maxRows)}%`
          }}
        />
      );
    }
  }

  return (
    <div 
      className="relative w-full bg-slate-50 overflow-hidden shadow-inner"
      style={{ 
        aspectRatio: `${maxCols} / ${maxRows}`,
        minHeight: '400px' // 确保在某些容器中至少有最小高度
      }}
    >
      {/* 背景格线 */}
      <div className="absolute inset-0 z-0">
        {cells}
      </div>

      {/* 顶部危险警戒线 */}
      <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-red-100/50 to-transparent border-b-2 border-dashed border-red-300 z-10 pointer-events-none flex flex-col items-center justify-start pt-2">
         <span className="text-[10px] font-black text-red-500 tracking-widest opacity-60">DANGER ZONE</span>
      </div>

      {/* 活跃方块层 */}
      <div className="relative z-20 w-full h-full p-0.5">
        {grid.length === 0 && (
          <div className="flex items-center justify-center h-full text-slate-300 font-bold italic">
            Wait for blocks...
          </div>
        )}
        {grid.map(tile => (
          <Tile 
            key={tile.id} 
            data={tile} 
            onClick={() => onSelect(tile.id)} 
            gridHeight={maxRows}
            gridWidth={maxCols}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
