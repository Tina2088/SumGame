
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameMode, GameStatus, TileData, GameState, Language, TRANSLATIONS } from './types';
import GameBoard from './components/GameBoard';
import Menu from './components/Menu';
import Stats from './components/Stats';
import GameOver from './components/GameOver';

const COLUMNS = 6;
const ROWS = 10;
const INITIAL_ROWS = 4;
const TIME_PER_ROUND = 15;

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh');
  const [gameState, setGameState] = useState<GameState>({
    grid: [],
    score: 0,
    target: 0,
    timeLeft: TIME_PER_ROUND,
    status: GameStatus.MENU,
    mode: GameMode.CLASSIC,
    highScore: 0,
  });

  // 使用 ReturnType 兼容浏览器和 Node.js 类型定义，防止 tsc 报错
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t = TRANSLATIONS[lang];

  // 初始化最高分
  useEffect(() => {
    const saved = localStorage.getItem('sumblock_high_score');
    if (saved) {
      setGameState(prev => ({ ...prev, highScore: Number(saved) }));
    }
  }, []);

  const generateRandomTarget = useCallback(() => {
    return Math.floor(Math.random() * 21) + 12; // 12 - 32
  }, []);

  const generateRow = useCallback((rowIdx: number): TileData[] => {
    const row: TileData[] = [];
    for (let col = 0; col < COLUMNS; col++) {
      row.push({
        id: Math.random().toString(36).substring(2, 11),
        value: Math.floor(Math.random() * 9) + 1,
        row: rowIdx,
        col: col,
        isSelected: false
      });
    }
    return row;
  }, []);

  const initGame = useCallback((mode: GameMode) => {
    let initialGrid: TileData[] = [];
    for (let r = 0; r < INITIAL_ROWS; r++) {
      initialGrid = [...initialGrid, ...generateRow(r)];
    }

    setGameState(prev => ({
      ...prev,
      grid: initialGrid,
      score: 0,
      target: generateRandomTarget(),
      timeLeft: TIME_PER_ROUND,
      status: GameStatus.PLAYING,
      mode: mode,
    }));
  }, [generateRow, generateRandomTarget]);

  const handleTileSelect = (id: string) => {
    if (gameState.status !== GameStatus.PLAYING) return;

    setGameState(prev => {
      const updatedGrid = prev.grid.map(tile => 
        tile.id === id ? { ...tile, isSelected: !tile.isSelected } : tile
      );

      const selectedTiles = updatedGrid.filter(t => t.isSelected);
      const currentSum = selectedTiles.reduce((acc, curr) => acc + curr.value, 0);

      if (currentSum === prev.target) {
        const remainingGrid = updatedGrid.filter(t => !t.isSelected);
        const newScore = prev.score + selectedTiles.length * 10;
        const newHighScore = Math.max(newScore, prev.highScore);
        
        if (prev.mode === GameMode.CLASSIC) {
          const nextGrid = remainingGrid.map(tile => ({ ...tile, row: tile.row + 1 }));
          const isGameOver = nextGrid.some(tile => tile.row >= ROWS);
          if (isGameOver) {
            localStorage.setItem('sumblock_high_score', newHighScore.toString());
            return { ...prev, status: GameStatus.GAMEOVER, grid: nextGrid, score: newScore, highScore: newHighScore };
          }

          return {
            ...prev,
            grid: [...nextGrid, ...generateRow(0)],
            score: newScore,
            target: generateRandomTarget(),
            highScore: newHighScore
          };
        } else {
          localStorage.setItem('sumblock_high_score', newHighScore.toString());
          return {
            ...prev,
            grid: remainingGrid,
            score: newScore,
            target: generateRandomTarget(),
            timeLeft: TIME_PER_ROUND,
            highScore: newHighScore
          };
        }
      } else if (currentSum > prev.target) {
        return {
          ...prev,
          grid: updatedGrid.map(t => ({ ...t, isSelected: false }))
        };
      }

      return { ...prev, grid: updatedGrid };
    });
  };

  useEffect(() => {
    if (gameState.status === GameStatus.PLAYING && gameState.mode === GameMode.TIME) {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            const nextGrid = prev.grid.map(tile => ({ ...tile, row: tile.row + 1 }));
            if (nextGrid.some(tile => tile.row >= ROWS)) {
              localStorage.setItem('sumblock_high_score', prev.highScore.toString());
              return { ...prev, status: GameStatus.GAMEOVER, grid: nextGrid };
            }
            return {
              ...prev,
              grid: [...nextGrid, ...generateRow(0)],
              timeLeft: TIME_PER_ROUND,
            };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState.status, gameState.mode, generateRow]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-2 bg-[#f3f4f6] select-none text-slate-800">
      <div className="w-full max-w-sm max-h-[95vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-[6px] border-slate-800 relative">
        
        <div className="p-4 flex justify-between items-center border-b-4 border-slate-800 bg-indigo-50 shrink-0">
          <h1 className="text-xl font-black text-slate-800 italic uppercase tracking-tighter">{t.title}</h1>
          <button 
            onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
            className="px-3 py-1 bg-white border-2 border-slate-800 rounded-full text-xs font-bold hover:bg-slate-800 hover:text-white transition-all"
          >
            {t.lang}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          {gameState.status === GameStatus.MENU && (
            <Menu lang={lang} onStart={initGame} highScore={gameState.highScore} />
          )}

          {gameState.status === GameStatus.PLAYING && (
            <>
              <Stats state={gameState} lang={lang} />
              <GameBoard 
                grid={gameState.grid} 
                onSelect={handleTileSelect} 
                maxRows={ROWS}
                maxCols={COLUMNS}
              />
            </>
          )}

          {gameState.status === GameStatus.GAMEOVER && (
            <GameOver 
              score={gameState.score} 
              highScore={gameState.highScore} 
              lang={lang} 
              onRestart={() => setGameState(s => ({ ...s, status: GameStatus.MENU }))} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
