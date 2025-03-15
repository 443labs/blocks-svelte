import { generateRandomTetromino, isValidPosition, rotateTetromino, calculateGhostPosition } from './tetrominoes';
import type { GameState, GridType, Tetromino, CellType, Position } from './types';
import { GameAction } from './types';

// Constants
export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;
export const POINTS_PER_LINE = 100;
export const POINTS_HARD_DROP = 2;

// Create a new empty grid
export function createEmptyGrid(): GridType {
  return Array(GRID_HEIGHT).fill(0).map(() => 
    Array(GRID_WIDTH).fill(0) as CellType[]
  );
}

// Create initial game state
export function createInitialState(): GameState {
  const nextTetromino = generateRandomTetromino();
  const currentTetromino = generateRandomTetromino();
  const grid = createEmptyGrid();
  
  return {
    grid,
    currentTetromino,
    nextTetromino,
    score: 0,
    level: 1,
    prevLevel: 1,
    lines: 0,
    gameOver: false,
    isPaused: false,
    ghostPosition: calculateGhostPosition(grid, currentTetromino)
  };
}

// Merge tetromino with grid
export function mergeTetrominoWithGrid(grid: GridType, tetromino: Tetromino): GridType {
  const newGrid = grid.map(row => [...row]);
  const { shape, position, type } = tetromino;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const newY = y + position.y;
        const newX = x + position.x;
        
        if (newY >= 0 && newY < GRID_HEIGHT && newX >= 0 && newX < GRID_WIDTH) {
          newGrid[newY][newX] = type;
        }
      }
    }
  }
  
  return newGrid;
}

// Check and clear completed lines
export function clearLines(grid: GridType): { newGrid: GridType; linesCleared: number } {
  const newGrid = [...grid];
  let linesCleared = 0;
  
  for (let y = GRID_HEIGHT - 1; y >= 0; y--) {
    if (newGrid[y].every(cell => cell !== 0)) {
      // Remove the line and add an empty line at the top
      newGrid.splice(y, 1);
      newGrid.unshift(Array(GRID_WIDTH).fill(0) as CellType[]);
      linesCleared++;
      // Since we've removed a line and added one at the top, we need to check the same index again
      y++;
    }
  }
  
  return { newGrid, linesCleared };
}

// Calculate new level based on lines cleared
export function calculateLevel(lines: number): number {
  return Math.floor(lines / 10) + 1;
}

// Calculate drop speed based on level
export function calculateDropSpeed(level: number): number {
  // Formula: 800 - (level - 1) * 50, but not less than 50
  return Math.max(800 - (level - 1) * 50, 50);
}

// Move tetromino
export function moveTetromino(state: GameState, direction: 'LEFT' | 'RIGHT' | 'DOWN'): GameState {
  if (state.gameOver || state.isPaused || !state.currentTetromino) return state;
  
  const { currentTetromino, grid } = state;
  const { x, y } = currentTetromino.position;
  
  let newX = x;
  let newY = y;
  
  switch (direction) {
    case 'LEFT':
      newX = x - 1;
      break;
    case 'RIGHT':
      newX = x + 1;
      break;
    case 'DOWN':
      newY = y + 1;
      break;
  }
  
  const newPosition = { x: newX, y: newY };
  const newTetromino = { 
    ...currentTetromino, 
    position: newPosition 
  };
  
  if (isValidPosition(grid, newTetromino)) {
    return {
      ...state,
      currentTetromino: newTetromino,
      ghostPosition: calculateGhostPosition(grid, newTetromino)
    };
  }
  
  // If DOWN movement is blocked, we need to place the tetromino
  if (direction === 'DOWN') {
    return placeTetromino(state);
  }
  
  return state;
}

// Rotate tetromino
export function rotatePiece(state: GameState): GameState {
  if (state.gameOver || state.isPaused || !state.currentTetromino) return state;
  
  const { currentTetromino, grid } = state;
  const rotatedShape = rotateTetromino(currentTetromino.shape);
  
  const newTetromino = {
    ...currentTetromino,
    shape: rotatedShape
  };
  
  // Handle wall kicks - try different positions to make rotation work
  const kicks = [
    { x: 0, y: 0 },   // Original position
    { x: -1, y: 0 },  // Try left
    { x: 1, y: 0 },   // Try right
    { x: 0, y: -1 },  // Try up
    { x: -1, y: -1 }, // Try up-left
    { x: 1, y: -1 },  // Try up-right
    { x: 0, y: 1 },   // Try down
    { x: -1, y: 1 },  // Try down-left
    { x: 1, y: 1 }    // Try down-right
  ];
  
  for (const kick of kicks) {
    const kickedTetromino = {
      ...newTetromino,
      position: {
        x: currentTetromino.position.x + kick.x,
        y: currentTetromino.position.y + kick.y
      }
    };
    
    if (isValidPosition(grid, kickedTetromino)) {
      return {
        ...state,
        currentTetromino: kickedTetromino,
        ghostPosition: calculateGhostPosition(grid, kickedTetromino)
      };
    }
  }
  
  // If no valid rotation found, return original state
  return state;
}

// Hard drop tetromino
export function hardDrop(state: GameState): GameState {
  if (state.gameOver || state.isPaused || !state.currentTetromino || !state.ghostPosition) return state;
  
  const { currentTetromino, ghostPosition } = state;
  const distance = ghostPosition.y - currentTetromino.position.y;
  
  // Update score for hard drop (2 points per cell dropped)
  const newScore = state.score + (distance * POINTS_HARD_DROP);
  
  // Move tetromino to ghost position
  const droppedTetromino = {
    ...currentTetromino,
    position: ghostPosition
  };
  
  return placeTetromino({
    ...state,
    currentTetromino: droppedTetromino,
    score: newScore
  });
}

// Place tetromino and generate new one
export function placeTetromino(state: GameState): GameState {
  if (!state.currentTetromino || !state.nextTetromino) return state;
  
  const { grid, currentTetromino, nextTetromino, score, lines } = state;
  
  // Merge current tetromino with grid
  const mergedGrid = mergeTetrominoWithGrid(grid, currentTetromino);
  
  // Check for completed lines
  const { newGrid, linesCleared } = clearLines(mergedGrid);
  
  // Calculate new score and total lines
  const newLines = lines + linesCleared;
  const linePoints = linesCleared * POINTS_PER_LINE * state.level;
  const newScore = score + linePoints;
  
  // Calculate new level
  const newLevel = calculateLevel(newLines);
  
  // Generate next tetromino
  const brandNewTetromino = generateRandomTetromino();
  
  // Check if game is over (can't place new tetromino)
  const gameOver = !isValidPosition(newGrid, nextTetromino);
  
  return {
    grid: newGrid,
    currentTetromino: gameOver ? null : nextTetromino,
    nextTetromino: gameOver ? null : brandNewTetromino,
    score: newScore,
    lines: newLines,
    level: newLevel,
    prevLevel: state.level,
    gameOver,
    isPaused: state.isPaused,
    ghostPosition: gameOver ? null : calculateGhostPosition(newGrid, nextTetromino)
  };
}

// Game tick - move current piece down
export function gameTick(state: GameState): GameState {
  if (state.gameOver || state.isPaused) return state;
  return moveTetromino(state, 'DOWN');
}

// Handle game actions
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action) {
    case GameAction.LEFT:
      return moveTetromino(state, 'LEFT');
    case GameAction.RIGHT:
      return moveTetromino(state, 'RIGHT');
    case GameAction.DOWN:
      return moveTetromino(state, 'DOWN');
    case GameAction.ROTATE:
      return rotatePiece(state);
    case GameAction.HARD_DROP:
      return hardDrop(state);
    case GameAction.PAUSE:
      return { ...state, isPaused: true };
    case GameAction.RESUME:
      return { ...state, isPaused: false };
    case GameAction.RESTART:
      return createInitialState();
    default:
      return state;
  }
}
