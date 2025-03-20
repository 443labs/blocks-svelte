<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createInitialState, gameTick, gameReducer, calculateDropSpeed } from '../game/gameLogic';
  import { GameAction } from '../game/types';
  import GameBoard from './GameBoard.svelte';
  import NextPiece from './NextPiece.svelte';
  import ScoreBoard from './ScoreBoard.svelte';
  import Controls from './Controls.svelte';

  // Initialize game state
  let gameState = createInitialState();
  let gameInterval: number | undefined;
  let dropSpeed = calculateDropSpeed(gameState.level);
  let highScore = 0;
  let soundsEnabled = true; // Only use this variable name throughout
  let bgMusic: HTMLAudioElement;
  let showSettings = false;
  let startLevel = 1;

  // Audio elements
  let moveSound: HTMLAudioElement;
  let rotateSound: HTMLAudioElement;
  let dropSound: HTMLAudioElement;
  let clearSound: HTMLAudioElement;
  let levelUpSound: HTMLAudioElement;
  let gameOverSound: HTMLAudioElement;

  // Play a sound effect
  function playSound(soundType: string) {
    if (!soundsEnabled) return;
    
    console.log("Playing sound:", soundType);
    
    switch (soundType) {
      case 'move':
        moveSound.currentTime = 0;
        moveSound.play().catch(e => console.error("Error playing move sound:", e));
        break;
      case 'rotate':
        rotateSound.currentTime = 0;
        rotateSound.play().catch(e => console.error("Error playing rotate sound:", e));
        break;
      case 'drop':
        dropSound.currentTime = 0;
        dropSound.play().catch(e => console.error("Error playing drop sound:", e));
        break;
      case 'clear':
        clearSound.currentTime = 0;
        clearSound.play().catch(e => console.error("Error playing clear sound:", e));
        break;
      case 'levelUp':
        levelUpSound.currentTime = 0;
        levelUpSound.play().catch(e => console.error("Error playing levelUp sound:", e));
        break;
      case 'gameOver':
        gameOverSound.currentTime = 0;
        gameOverSound.play().catch(e => console.error("Error playing gameOver sound:", e));
        break;
    }
  }

  // Create a new game with custom starting level
  function createNewGame(level = startLevel) {
    gameState = createInitialState();
    gameState.level = level;
    gameState.prevLevel = level;
    gameState.gameOver = true; // Start with game over state to show Start Game button
    dropSpeed = calculateDropSpeed(level);
  }

  // Setup game loop
  function startGameLoop() {
    stopGameLoop(); // Clear any existing interval first
    dropSpeed = calculateDropSpeed(gameState.level);
    gameInterval = setInterval(() => {
      const prevLevel = gameState.level;
      gameState = gameTick(gameState);
      
      // Play level up sound if level changed
      if (gameState.level !== prevLevel) {
        playSound('levelUp');
      }
      
      if (gameState.level !== gameState.prevLevel) {
        // Recalculate drop speed if level changed
        dropSpeed = calculateDropSpeed(gameState.level);
        startGameLoop(); // Restart game loop with new speed
      }
    }, dropSpeed);
  }

  function stopGameLoop() {
    if (gameInterval) {
      clearInterval(gameInterval);
      gameInterval = undefined;
    }
  }

  // Keyboard controls
  function handleKeydown(event: KeyboardEvent) {
    // Don't handle keypresses if game is over
    if (gameState.gameOver || gameState.isPaused) return;

    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        gameState = gameReducer(gameState, GameAction.LEFT);
        playSound('move');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        gameState = gameReducer(gameState, GameAction.RIGHT);
        playSound('move');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault();
        gameState = gameReducer(gameState, GameAction.DOWN);
        playSound('move');
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault();
        gameState = gameReducer(gameState, GameAction.ROTATE);
        break;
      case ' ':
        event.preventDefault();
        gameState = gameReducer(gameState, GameAction.HARD_DROP);
        break;
      case 'p':
      case 'P':
        event.preventDefault();
        if (gameState.isPaused) {
          gameState = gameReducer(gameState, GameAction.RESUME);
          startGameLoop();
        } else {
          gameState = gameReducer(gameState, GameAction.PAUSE);
          stopGameLoop();
        }
        break;
      case 'r':
      case 'R':
        event.preventDefault();
        restartGame();
        break;
    }
  }

  // Watch for game state changes to play sounds
  $: {
    // Check if game just ended
    if (gameState.gameOver) {
      playSound('gameOver');
    }
  }

  // Restart game function
  function restartGame() {
    saveHighScore(); // Save high score before restarting
    gameState = createInitialState(); // Create fresh state
    gameState.level = startLevel;
    gameState.prevLevel = startLevel;
    gameState.gameOver = false; // Clear game over state immediately
    startGameLoop(); // Start the game loop immediately
  }

  // Toggle settings menu
  function toggleSettings() {
    showSettings = !showSettings;
    if (showSettings && !gameState.isPaused && !gameState.gameOver) {
      gameState = gameReducer(gameState, GameAction.PAUSE);
      stopGameLoop();
    }
  }

  // Toggle sound
  function toggleSound() {
    soundsEnabled = !soundsEnabled;
    localStorage.setItem('blocksGameSoundEnabled', String(soundsEnabled));
    
    console.log("Sound toggled:", soundsEnabled);
    
    if (soundsEnabled) {
      playBackgroundMusic();
    } else {
      pauseBackgroundMusic();
    }
  }

  // Toggle background music
  function toggleBackgroundMusic() {
    soundsEnabled = !soundsEnabled;
    localStorage.setItem('blocksGameSoundEnabled', String(soundsEnabled));
    
    if (soundsEnabled) {
      playBackgroundMusic();
    } else {
      pauseBackgroundMusic();
    }
  }

  // Save high score to localStorage
  function saveHighScore() {
    if (gameState.score > highScore) {
      highScore = gameState.score;
      try {
        localStorage.setItem('highScore', highScore.toString());
      } catch (e) {
        console.error('Could not save high score to localStorage:', e);
      }
    }
  }

  // Load high score from localStorage
  function loadHighScore() {
    try {
      const savedHighScore = localStorage.getItem('highScore');
      if (savedHighScore) {
        highScore = parseInt(savedHighScore, 10);
      }
      
      // Load sound preference
      const savedSoundEnabled = localStorage.getItem('blocksGameSoundEnabled');
      if (savedSoundEnabled !== null) {
        soundsEnabled = savedSoundEnabled === 'true';
      }
    } catch (e) {
      console.error('Could not load preferences from localStorage:', e);
    }
  }

  // Setup background music
  function setupBackgroundMusic() {
    console.log("Setting up background music");
    bgMusic = new Audio('/sounds/theme.wav');
    bgMusic.loop = true;
    bgMusic.volume = 0.4;
  }

  // Play background music
  function playBackgroundMusic() {
    console.log("Attempting to play background music", soundsEnabled);
    if (bgMusic && soundsEnabled && !gameState.gameOver) {
      bgMusic.play().catch(err => console.error('Audio playback error:', err));
    }
  }

  // Pause background music
  function pauseBackgroundMusic() {
    if (bgMusic) {
      bgMusic.pause();
    }
  }

  // Add and remove event listeners on mount/destroy
  onMount(() => {
    console.log("Component mounted");
    
    // Initialize sound preference from localStorage
    const savedSoundPreference = localStorage.getItem('blocksGameSoundEnabled');
    if (savedSoundPreference !== null) {
      soundsEnabled = savedSoundPreference === 'true';
      console.log("Loaded sound preference:", soundsEnabled);
    }

    // Initialize high score from localStorage
    loadHighScore();
    
    // Initialize audio elements
    moveSound = new Audio('/sounds/move.wav');
    rotateSound = new Audio('/sounds/rotate.wav');
    dropSound = new Audio('/sounds/drop.wav');
    clearSound = new Audio('/sounds/clear.wav');
    levelUpSound = new Audio('/sounds/levelup.wav');
    gameOverSound = new Audio('/sounds/gameover.wav');

    // Setup background music
    setupBackgroundMusic();
    
    // Add a user interaction handler to start audio (browser policy)
    const startAudio = () => {
      if (soundsEnabled) {
        console.log("User interaction - starting audio");
        playBackgroundMusic();
      }
      window.removeEventListener('click', startAudio);
      window.removeEventListener('keydown', startAudio);
    };
    
    window.addEventListener('click', startAudio);
    window.addEventListener('keydown', startAudio);

    // Start game in initial state without starting the game loop
    window.addEventListener('keydown', handleKeydown);
    createNewGame(startLevel);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      stopGameLoop();
    };
  });

  // Clean up on destroy
  onDestroy(() => {
    saveHighScore(); // Save high score before component is destroyed
    stopGameLoop();
    pauseBackgroundMusic();
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="game-container min-h-screen flex">
  <!-- Left Panel with Title, Next Piece, and Score -->
  <div class="w-64 bg-gray-800 p-4 flex flex-col border-r border-gray-700">
    <h1 class="text-3xl font-bold text-white mb-6">Blocks Game</h1>
    
    <div class="flex flex-col gap-6">
      <NextPiece nextTetromino={gameState.nextTetromino} />
      <ScoreBoard 
        score={gameState.score} 
        level={gameState.level} 
        lines={gameState.lines}
        {highScore}
      />
    </div>
  </div>

  <!-- Main Game Area -->
  <div class="flex-1 p-4 relative">
    <!-- Right Side Controls -->
    <div class="absolute top-4 right-0 w-64 flex flex-col gap-4 pr-4">
      <!-- Combined controls section -->
      <div class="flex flex-col gap-3">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none"
          on:click={toggleSettings}
        >
          Settings
        </button>
        {#if !gameState.gameOver}
          <button
            class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none"
            on:click={() => {
              if (gameState.isPaused && !showSettings) {
                gameState = gameReducer(gameState, GameAction.RESUME);
                startGameLoop();
              } else if (!showSettings) {
                gameState = gameReducer(gameState, GameAction.PAUSE);
                stopGameLoop();
              }
            }}
          >
            {gameState.isPaused ? 'Resume Game' : 'Pause Game'}
          </button>
        {/if}
        <button 
          class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none"
          on:click={toggleSound}
        >
          {soundsEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
        </button>

        <!-- Controls moved up here -->
        <div class="mt-4 bg-gray-900 rounded-md">
          <Controls />
        </div>
      </div>
    </div>

    <!-- Game Board -->
    <div class="flex justify-center items-center h-full max-h-screen pr-64">
      <div class="w-auto h-[90vh] aspect-[1/2]">
        <GameBoard {gameState} on:restart={restartGame} on:lineClear={() => null} />
      </div>
    </div>
  </div>

  <!-- Settings Modal -->
  {#if showSettings}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold text-white mb-4">Game Settings</h2>
        
        <div class="mb-4">
          <label for="level-select" class="block text-white text-sm font-medium mb-2">
            Starting Level (Higher = Faster)
          </label>
          <select 
            id="level-select"
            class="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            bind:value={startLevel}
          >
            {#each Array(10) as _, i}
              <option value={i + 1}>{i + 1}</option>
            {/each}
          </select>
        </div>
        
        <div class="mb-4">
          <label class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" 
              bind:checked={soundsEnabled}
            >
            <span class="text-white">Enable Sound Effects</span>
          </label>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button 
            class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            on:click={toggleSettings}
          >
            Cancel
          </button>
          <button 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            on:click={() => {
              toggleSettings();
              if (gameState.gameOver) {
                restartGame();
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    background-color: #111827;
    background-image: 
      radial-gradient(rgba(75, 85, 99, 0.4) 1px, transparent 1px),
      radial-gradient(rgba(75, 85, 99, 0.2) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;
    margin: 0;
    overflow: hidden;
  }
  
  .game-container {
    height: 100vh;
  }
</style>
