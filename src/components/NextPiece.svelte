<script lang="ts">
  import { COLORS } from '../game/tetrominoes';
  import type { Tetromino, CellType } from '../game/types';

  export let nextTetromino: Tetromino | null;
</script>

<div class="next-piece w-full bg-gray-900 p-4 rounded-md border-2 border-gray-700">
  <h3 class="text-white text-lg font-semibold mb-2 text-center">Next</h3>
  
  <div class="grid gap-0.5 w-full aspect-square justify-center items-center">
    {#if nextTetromino}
      <div class="grid grid-cols-4 grid-rows-4 bg-gray-800 w-full aspect-square">
        {#each new Array(4) as _, y}
          {#each new Array(4) as _, x}
            <div 
              class="cell w-full h-full border border-gray-800 transition-colors duration-100"
              style="background-color: {
                nextTetromino.shape[y] && nextTetromino.shape[y][x] !== 0 
                  ? COLORS[nextTetromino.type] 
                  : 'transparent'
              }"
            ></div>
          {/each}
        {/each}
      </div>
    {:else}
      <div class="w-full aspect-square bg-gray-800"></div>
    {/if}
  </div>
</div>

<style>
  .next-piece {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
</style>
