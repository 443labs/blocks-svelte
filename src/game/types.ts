export type CellType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type GridType = CellType[][];

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  shape: CellType[][];
  position: Position;
  type: CellType;
}

export interface GameState {
  grid: GridType;
  currentTetromino: Tetromino | null;
  nextTetromino: Tetromino | null;
  score: number;
  level: number;
  prevLevel: number;
  lines: number;
  gameOver: boolean;
  isPaused: boolean;
  ghostPosition: Position | null;
}

export enum GameAction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  ROTATE = 'ROTATE',
  HARD_DROP = 'HARD_DROP',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
  RESTART = 'RESTART',
}
