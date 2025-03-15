<script lang="ts">
  // No props needed for this component
</script>

<div class="controls bg-gray-900 p-4 rounded-md border-2 border-gray-700 w-full">
  <h3 class="text-white text-lg font-semibold mb-3 text-center">Controls</h3>
  
  <div class="grid grid-cols-2 gap-2 text-sm">
    <div class="text-gray-400">Left</div>
    <div class="text-white font-medium">← / A</div>
    
    <div class="text-gray-400">Right</div>
    <div class="text-white font-medium">→ / D</div>
    
    <div class="text-gray-400">Down</div>
    <div class="text-white font-medium">↓ / S</div>
    
    <div class="text-gray-400">Rotate</div>
    <div class="text-white font-medium">↑ / W</div>
    
    <div class="text-gray-400">Hard Drop</div>
    <div class="text-white font-medium">Space</div>
    
    <div class="text-gray-400">Pause</div>
    <div class="text-white font-medium">P</div>
  </div>
</div>

<style>
  .controls {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
</style>
