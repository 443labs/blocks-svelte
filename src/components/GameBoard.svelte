<script lang="ts">
  import { COLORS } from '../game/tetrominoes';
  import type { GameState, CellType, Position } from '../game/types';
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();
  
  export let gameState: GameState;
  
  // Track previous position to detect landings
  let prevPosition: Position | null = null;
  let justLanded = false;
  let landingAnimation = false;
  
  // Watch for landing
  $: {
    if (gameState.currentTetromino && prevPosition) {
      // Check if the tetromino has landed by checking if ghost position Y matches current Y
      // This means the piece can't drop further
      if (gameState.ghostPosition && 
          gameState.ghostPosition.y === gameState.currentTetromino.position.y) {
        justLanded = true;
      } else {
        justLanded = false;
      }
    }
    
    // Update previous position
    if (gameState.currentTetromino) {
      prevPosition = { ...gameState.currentTetromino.position };
    }
  }
  
  // Trigger landing animation when a piece locks into place
  $: {
    if (justLanded) {
      landingAnimation = true;
      setTimeout(() => {
        landingAnimation = false;
      }, 300); // Animation duration
      justLanded = false;
    }
  }

  // Dispatch lineClear event when lines are cleared
  $: {
    // If lines changed, dispatch event
    if (gameState.lines > 0) {
      dispatch('lineClear');
    }
  }

  // Function to determine the color of a cell
  function getCellColor(cellValue: CellType, row: number, col: number): string {
    // First check if the current cell is part of the active tetromino
    if (gameState.currentTetromino) {
      const { shape, position, type } = gameState.currentTetromino;
      
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            if (position.y + y === row && position.x + x === col) {
              // Add the "dropping" class to active tetromino cells
              return COLORS[type];
            }
          }
        }
      }
    }
    
    // Then check if it's a ghost piece position
    if (cellValue === 0 && gameState.ghostPosition && gameState.currentTetromino) {
      const { shape, type } = gameState.currentTetromino;
      const ghostX = gameState.ghostPosition.x;
      const ghostY = gameState.ghostPosition.y;

      // Check if this cell is part of the ghost piece
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            if (ghostY + y === row && ghostX + x === col) {
              // Return a semi-transparent version of the tetromino color
              return COLORS[type] + '40'; // 40 is hex for 25% opacity
            }
          }
        }
      }
    }
    
    // Otherwise, return the color based on grid value
    return COLORS[cellValue];
  }

  // Function to check if a cell is part of the active tetromino
  function isActiveTetromino(row: number, col: number): boolean {
    if (!gameState.currentTetromino) return false;
    
    const { shape, position } = gameState.currentTetromino;
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          if (position.y + y === row && position.x + x === col) {
            return true;
          }
        }
      }
    }
    
    return false;
  }

  // Function to get drop guide position data - only the leftmost and rightmost columns
  function getDropGuides() {
    if (!gameState.currentTetromino) return [];
    
    const { shape, position } = gameState.currentTetromino;
    
    // Find leftmost and rightmost filled columns in the shape
    let minCol = Infinity;
    let maxCol = -Infinity;
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          minCol = Math.min(minCol, x);
          maxCol = Math.max(maxCol, x);
        }
      }
    }
    
    // Convert to actual grid positions
    const leftEdge = position.x + minCol;
    const rightEdge = position.x + maxCol + 1; // +1 for the right edge (inclusive)
    
    return [leftEdge, rightEdge];
  }
</script>

<div class="relative w-full max-w-md mx-auto">
  <!-- Drop guides - must be before the grid to appear behind -->
  {#if gameState.currentTetromino && !gameState.gameOver && !gameState.isPaused}
    {#each getDropGuides() as column}
      <div 
        class="absolute top-0 bottom-0 drop-guide"
        style="width: 10%; left: {column * 10}%;"
      ></div>
    {/each}
  {/if}

  <div class="grid-container w-full aspect-[1/2] bg-gray-900 rounded-md overflow-hidden grid grid-cols-10 grid-rows-20 border-2 border-gray-700 relative">
    {#each gameState.grid as row, rowIndex}
      {#each row as cell, colIndex}
        <div 
          class="cell w-full h-full border border-gray-800 transition-colors duration-100"
          class:active-tetromino={isActiveTetromino(rowIndex, colIndex)}
          class:landing-flash={landingAnimation}
          style="background-color: {getCellColor(cell, rowIndex, colIndex)}"
        ></div>
      {/each}
    {/each}
    
    <!-- Landing impact animation -->
    {#if landingAnimation}
      <div class="landing-effect"></div>
    {/if}
  </div>

  <!-- Game Over Overlay -->
  {#if gameState.gameOver}
    <div class="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-md">
      <div class="text-center p-4">
        <h2 class="text-red-500 text-2xl font-bold mb-4">Game Over</h2>
        <p class="text-white mb-4">Score: {gameState.score}</p>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
          on:click={() => dispatch('restart')}
        >
          Play Again
        </button>
      </div>
    </div>
  {/if}
  
  <!-- Paused Overlay -->
  {#if gameState.isPaused && !gameState.gameOver}
    <div class="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-md">
      <div class="text-center">
        <h2 class="text-yellow-400 text-2xl font-bold">Game Paused</h2>
        <p class="text-white mt-2">Press P to resume</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .grid-container {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  
  .cell {
    transition: background-color 0.1s ease;
  }
  
  .drop-guide {
    background: repeating-linear-gradient(
      to bottom,
      rgba(0, 255, 255, 0.15) 0px,
      rgba(0, 255, 255, 0.15) 2px,
      transparent 2px,
      transparent 6px
    );
    z-index: 0;
    pointer-events: none;
  }
  
  /* Flashing animation for dropping blocks */
  .active-tetromino {
    animation: flash 0.8s infinite;
  }
  
  @keyframes flash {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.3); }
  }
  
  /* Landing animation */
  .landing-flash {
    animation: impact 0.3s ease-out;
  }
  
  @keyframes impact {
    0% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(1.1); filter: brightness(1.5); }
    100% { transform: scale(1); filter: brightness(1); }
  }
  
  .landing-effect {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
    animation: boom 0.3s ease-out;
    pointer-events: none;
    z-index: 20;
  }
  
  @keyframes boom {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
</style>
