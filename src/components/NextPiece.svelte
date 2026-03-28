<script lang="ts">
  import { COLORS } from '../game/tetrominoes';
  import type { Tetromino } from '../game/types';

  let { nextTetromino }: { nextTetromino: Tetromino | null } = $props();
</script>

<div class="next-piece w-full bg-gray-900 p-4 rounded-md border-2 border-gray-700">
  <h3 class="text-white text-lg font-semibold mb-2 text-center">Next</h3>

  {#if nextTetromino}
    <div class="w-full aspect-square bg-gray-800 flex items-center justify-center">
      <div
        style="display: grid; grid-template-columns: repeat({nextTetromino.shape[0].length}, 1fr); width: {nextTetromino.shape[0].length / 4 * 100}%; aspect-ratio: {nextTetromino.shape[0].length} / {nextTetromino.shape.length};"
      >
        {#each nextTetromino.shape as row}
          {#each row as cell}
            <div
              class="border border-gray-800"
              style="background-color: {cell ? COLORS[nextTetromino.type] : 'transparent'}"
            ></div>
          {/each}
        {/each}
      </div>
    </div>
  {:else}
    <div class="w-full aspect-square bg-gray-800"></div>
  {/if}
</div>

<style>
  .next-piece {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
</style>
