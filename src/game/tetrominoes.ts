import type { CellType, Tetromino, Position } from './types';

// Tetromino shapes
// 0 = empty, 1-7 = tetromino types (correspond to colors)
export const SHAPES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  J: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ],
  L: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],
  O: [
    [4, 4],
    [4, 4]
  ],
  S: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  T: [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ]
};

// Shape to cell type mapping
export const SHAPE_TO_TYPE: Record<string, CellType> = {
  'I': 1,
  'J': 2,
  'L': 3,
  'O': 4,
  'S': 5,
  'T': 6,
  'Z': 7
};

// Color mapping for tetromino types
export const COLORS = {
  0: 'transparent',  // Empty cell
  1: '#00FFFF',      // I - Cyan
  2: '#0000FF',      // J - Blue
  3: '#FF7F00',      // L - Orange
  4: '#FFFF00',      // O - Yellow
  5: '#00FF00',      // S - Green
  6: '#800080',      // T - Purple
  7: '#FF0000'       // Z - Red
};

// Generate a random tetromino
export function generateRandomTetromino(): Tetromino {
  const shapes = Object.keys(SHAPES);
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)] as keyof typeof SHAPES;
  const type = SHAPE_TO_TYPE[randomShape];
  
  return {
    shape: SHAPES[randomShape] as CellType[][],
    position: { x: 3, y: 0 }, // Start position at top-center
    type
  };
}

// Rotate a tetromino matrix (clockwise)
export function rotateTetromino(matrix: CellType[][]): CellType[][] {
  const N = matrix.length;
  const result = Array(N).fill(0).map(() => Array(N).fill(0) as CellType[]);
  
  // Transpose matrix
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      result[j][N - 1 - i] = matrix[i][j];
    }
  }
  
  return result;
}

// Check if position is valid (within bounds and not colliding)
export function isValidPosition(grid: CellType[][], tetromino: Tetromino): boolean {
  const { shape, position } = tetromino;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const newX = x + position.x;
        const newY = y + position.y;
        
        // Check bounds
        if (
          newX < 0 || 
          newX >= grid[0].length || 
          newY >= grid.length
        ) {
          return false;
        }
        
        // Check if cell is already occupied
        if (newY >= 0 && grid[newY][newX] !== 0) {
          return false;
        }
      }
    }
  }
  
  return true;
}

// Calculate ghost piece position (preview of where piece will land)
export function calculateGhostPosition(grid: CellType[][], tetromino: Tetromino): Position {
  const { shape, position } = tetromino;
  let ghostY = position.y;
  
  // Keep moving down until invalid position
  while (isValidPosition(grid, {
    shape,
    position: { x: position.x, y: ghostY + 1 },
    type: tetromino.type
  })) {
    ghostY++;
  }
  
  return { x: position.x, y: ghostY };
}
