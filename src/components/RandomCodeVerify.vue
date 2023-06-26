<script setup lang="ts">
defineOptions({
  name: 'RandomCodeVerify'
});

interface Props {
  identifyCode?: string;
  width?: number;
  height?: number;
  fontSizeRange?: [number, number];
  bgcRange?: [number, number];
  colorRange?: [number, number];
  lineColorRange?: [number, number];
}
</script>

<template>
  <div class="v-wrap">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="less" scoped>
.v-wrap {
  padding: 2px;
  canvas {
    margin-left: 2px;
    margin-top: 1px;
  }
}
</style>
