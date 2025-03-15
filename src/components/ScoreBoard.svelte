<script lang="ts">
  export let score: number;
  export let level: number;
  export let lines: number;
  export let highScore: number = 0;
</script>

<div class="scoreboard bg-gray-900 p-4 rounded-md border-2 border-gray-700 w-full">
  <div class="grid grid-cols-1 gap-3">
    <div class="stat">
      <h3 class="text-white text-sm font-semibold">Score</h3>
      <p class="text-yellow-400 text-xl font-bold">{score}</p>
    </div>
    
    <div class="stat">
      <h3 class="text-white text-sm font-semibold">High Score</h3>
      <p class="text-red-400 text-xl font-bold">{highScore}</p>
    </div>
    
    <div class="stat">
      <h3 class="text-white text-sm font-semibold">Level</h3>
      <p class="text-green-400 text-xl font-bold">{level}</p>
    </div>
    
    <div class="stat">
      <h3 class="text-white text-sm font-semibold">Lines</h3>
      <p class="text-blue-400 text-xl font-bold">{lines}</p>
    </div>
  </div>
</div>

<style>
  .scoreboard {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .stat {
    text-align: center;
  }
</style>
