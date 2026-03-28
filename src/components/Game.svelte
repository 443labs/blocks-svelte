<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createInitialState, gameTick, gameReducer, calculateDropSpeed } from '../game/gameLogic';
  import { GameAction } from '../game/types';
  import GameBoard from './GameBoard.svelte';
  import NextPiece from './NextPiece.svelte';
  import ScoreBoard from './ScoreBoard.svelte';
  import Controls from './Controls.svelte';

  // Initialize game state
  let gameState = $state(createInitialState());
  let gameInterval: number | undefined;
  let dropSpeed = calculateDropSpeed(gameState.level);
  let highScore = $state(0);
  let soundsEnabled = $state(true);
  let bgMusic: HTMLAudioElement;
  let showSettings = $state(false);
  let startLevel = $state(1);
  let gameHasStarted = $state(false);

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
    gameState.gameOver = true;
    dropSpeed = calculateDropSpeed(level);
  }

  // Setup game loop
  function startGameLoop() {
    stopGameLoop();
    dropSpeed = calculateDropSpeed(gameState.level);
    gameInterval = setInterval(() => {
      const prevLevel = gameState.level;
      gameState = gameTick(gameState);

      if (gameState.level !== prevLevel) {
        playSound('levelUp');
      }

      if (gameState.level !== gameState.prevLevel) {
        dropSpeed = calculateDropSpeed(gameState.level);
        startGameLoop();
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
    switch (event.key) {
      case 'p':
      case 'P':
        event.preventDefault();
        if (gameState.isPaused && !showSettings) {
          gameState = gameReducer(gameState, GameAction.RESUME);
          startGameLoop();
        } else if (!showSettings && !gameState.gameOver) {
          gameState = gameReducer(gameState, GameAction.PAUSE);
          stopGameLoop();
        }
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
      case 'ArrowRight':
      case 'd':
      case 'D':
      case 'ArrowDown':
      case 's':
      case 'S':
      case 'ArrowUp':
      case 'w':
      case 'W':
      case ' ':
        if (gameState.gameOver || gameState.isPaused) return;
        event.preventDefault();
        if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
          gameState = gameReducer(gameState, GameAction.LEFT);
          playSound('move');
        } else if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
          gameState = gameReducer(gameState, GameAction.RIGHT);
          playSound('move');
        } else if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
          gameState = gameReducer(gameState, GameAction.DOWN);
          playSound('move');
        } else if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
          gameState = gameReducer(gameState, GameAction.ROTATE);
          playSound('rotate');
        } else if (event.key === ' ') {
          gameState = gameReducer(gameState, GameAction.HARD_DROP);
          playSound('drop');
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
  $effect(() => {
    if (gameState.gameOver && gameHasStarted) {
      playSound('gameOver');
    }
  });

  // Restart game function
  function restartGame() {
    saveHighScore();
    gameState = createInitialState();
    gameState.level = startLevel;
    gameState.prevLevel = startLevel;
    gameState.gameOver = false;
    gameHasStarted = true;
    startGameLoop();
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
    bgMusic = new Audio(`${import.meta.env.BASE_URL}sounds/theme.wav`);
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

    const savedSoundPreference = localStorage.getItem('blocksGameSoundEnabled');
    if (savedSoundPreference !== null) {
      soundsEnabled = savedSoundPreference === 'true';
      console.log("Loaded sound preference:", soundsEnabled);
    }

    loadHighScore();

    const base = import.meta.env.BASE_URL;
    moveSound = new Audio(`${base}sounds/move.wav`);
    rotateSound = new Audio(`${base}sounds/rotate.wav`);
    dropSound = new Audio(`${base}sounds/drop.wav`);
    clearSound = new Audio(`${base}sounds/clear.wav`);
    levelUpSound = new Audio(`${base}sounds/levelup.wav`);
    gameOverSound = new Audio(`${base}sounds/gameover.wav`);

    setupBackgroundMusic();

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

    window.addEventListener('keydown', handleKeydown);
    createNewGame(startLevel);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      stopGameLoop();
    };
  });

  // Clean up on destroy
  onDestroy(() => {
    saveHighScore();
    stopGameLoop();
    pauseBackgroundMusic();
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="game-container h-screen flex items-stretch justify-center overflow-hidden">
  <!-- Left Panel with Title, Next Piece, and Score -->
  <div class="w-48 shrink-0 bg-gray-800 p-3 flex flex-col border-r border-gray-700">
    <h1 class="text-2xl font-bold text-white mb-4">Blocks</h1>

    <div class="flex flex-col gap-4">
      <NextPiece nextTetromino={gameState.nextTetromino} />
      <ScoreBoard
        score={gameState.score}
        level={gameState.level}
        lines={gameState.lines}
        {highScore}
      />

      <!-- Inline controls for narrow viewports -->
      <div class="flex flex-col gap-2 lg:hidden">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md text-sm transition-colors duration-200 focus:outline-none"
          onclick={toggleSettings}
        >
          Settings
        </button>
        {#if !gameState.gameOver}
          <button
            class="bg-gray-700 hover:bg-gray-600 text-white py-1.5 px-3 rounded-md text-sm transition-colors duration-200 focus:outline-none"
            onclick={() => {
              if (gameState.isPaused && !showSettings) {
                gameState = gameReducer(gameState, GameAction.RESUME);
                startGameLoop();
              } else if (!showSettings) {
                gameState = gameReducer(gameState, GameAction.PAUSE);
                stopGameLoop();
              }
            }}
          >
            {gameState.isPaused ? 'Resume' : 'Pause'}
          </button>
        {/if}
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-3 rounded-md text-sm transition-colors duration-200 focus:outline-none"
          onclick={toggleSound}
        >
          {soundsEnabled ? '🔊 On' : '🔇 Off'}
        </button>
      </div>
    </div>
  </div>

  <!-- Game Board -->
  <div class="flex items-center py-2">
    <div style="height: 96vh; aspect-ratio: 1/2;">
      <GameBoard
        {gameState}
        onrestart={restartGame}
        onresume={() => {
          if (gameState.isPaused) {
            gameState = gameReducer(gameState, GameAction.RESUME);
            startGameLoop();
          }
        }}
        onlineClear={() => null}
      />
    </div>
  </div>

  <!-- Right Panel with Controls (hidden on narrow viewports) -->
  <div class="hidden lg:flex w-52 shrink-0 p-4 flex-col gap-3">
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none"
      onclick={toggleSettings}
    >
      Settings
    </button>
    {#if !gameState.gameOver}
      <button
        class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none"
        onclick={() => {
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
      onclick={toggleSound}
    >
      {soundsEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
    </button>

    <div class="mt-4 bg-gray-900 rounded-md">
      <Controls />
    </div>
  </div>

  <!-- Settings Modal -->
  {#if showSettings}
    <div class="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
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
            onclick={toggleSettings}
          >
            Cancel
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onclick={() => {
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
    max-height: 100vh;
  }
</style>
