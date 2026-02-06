
export enum GameMode {
  CLASSIC = 'CLASSIC',
  TIME = 'TIME'
}

export enum GameStatus {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  GAMEOVER = 'GAMEOVER'
}

export interface TileData {
  id: string;
  value: number;
  row: number;
  col: number;
  isSelected?: boolean;
}

export interface GameState {
  grid: TileData[];
  score: number;
  target: number;
  timeLeft: number;
  status: GameStatus;
  mode: GameMode;
  highScore: number;
}

export type Language = 'en' | 'zh';

export const TRANSLATIONS = {
  en: {
    title: 'SumBlock',
    classic: 'Classic Mode',
    time: 'Time Mode',
    start: 'Start Game',
    gameOver: 'Game Over!',
    restart: 'Play Again',
    highScore: 'High Score',
    score: 'Score',
    target: 'Target',
    back: 'Back to Menu',
    classicDesc: 'Clear rows by reaching the target sum.',
    timeDesc: 'Race against the clock! Sum up before time runs out.',
    sum: 'Current Sum',
    lang: '中文'
  },
  zh: {
    title: '数块消除',
    classic: '经典模式',
    time: '计时模式',
    start: '开始游戏',
    gameOver: '游戏结束！',
    restart: '再玩一次',
    highScore: '最高分',
    score: '得分',
    target: '目标数字',
    back: '返回菜单',
    classicDesc: '凑出目标数字消除方块，防止触顶。',
    timeDesc: '与时间赛跑！在倒计时结束前完成求和。',
    sum: '当前总和',
    lang: 'English'
  }
};
