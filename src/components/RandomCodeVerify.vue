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
  lineCountRange?: [number, number];
  dotColorRange: [number, number];
  dotCountRange?: [number, number];
}

const props = withDefaults(defineProps<Props>(), {
  identifyCode: 'abcd',
  width: 110,
  height: 36,
  fontSizeRange: () => [16, 32],
  bgcRange: () => [180, 240],
  colorRange: () => [50, 160],
  lineColorRange: () => [40, 180],
  lineCountRange: () => [2, 5],
  dotColorRange: () => [0, 255],
  dotCountRange: () => [20, 30]
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const codeCharArr = computed(() => props.identifyCode.split(''));

onMounted(() => {
  drawCanvas();
});

watch(
  () => props.identifyCode,
  () => {
    drawCanvas();
  }
);

function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor(min: number, max: number) {
  const [r, g, b] = [randomNum(min, max), randomNum(min, max), randomNum(min, max)];
  return `rgb(${r},${g},${b})`;
}

function drawCanvas() {
  const ctx = canvasRef.value?.getContext('2d');
  if (!ctx) return;
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = randomColor(...props.bgcRange);
  ctx.fillRect(0, 0, props.width, props.height);
  codeCharArr.value.forEach((v, i) => drawText(ctx, v, i));
  drawLine(ctx);
  drawDot(ctx);
}

function drawText(ctx: CanvasRenderingContext2D, txt: string, i: number) {
  ctx.fillStyle = randomColor(...props.colorRange);
  ctx.font = `${randomNum(...props.fontSizeRange)}px SimHei`;
  const x = (i + 1) * (props.width / (codeCharArr.value.length + 1));
  const y = randomNum(props.fontSizeRange[0], props.fontSizeRange[1] - 6);
  const deg = randomNum(-24, 24);
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 200);
  ctx.fillText(txt, 0, 0);
  // 复原，准备下一次绘制
  ctx.rotate((-deg * Math.PI) / 200);
  ctx.translate(-x, -y);
}

function drawLine(ctx: CanvasRenderingContext2D) {
  // 绘制干扰线
  const count = randomNum(...props.lineCountRange);
  for (let i = 0; i < count; i++) {
    ctx.strokeStyle = randomColor(...props.lineColorRange);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, props.width), randomNum(0, props.height));
    ctx.lineTo(randomNum(0, props.width), randomNum(0, props.height));
    ctx.stroke();
  }
}

function drawDot(ctx: CanvasRenderingContext2D) {
  // 绘制干扰点
  const count = randomNum(...props.dotCountRange);
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = randomColor(...props.dotColorRange);
    ctx.beginPath();
    ctx.arc(randomNum(0, props.width), randomNum(0, props.height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
}
</script>

<template>
  <div class="v-wrap">
    <canvas ref="canvasRef" :width="props.width" :height="props.height"></canvas>
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
