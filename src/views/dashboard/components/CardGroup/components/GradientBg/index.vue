<script setup lang="ts">
defineOptions({
  name: 'GradientBg'
});

interface Props {
  startColor?: string; // 渐变色开始颜色
  endColor?: string; // 渐变色结束颜色
}

const { startColor = '#c0c0aa', endColor = '#1cefff' } = $(defineProps<Props>());

const gradientStyle = computed(() => `linear-gradient(to right, ${startColor}, ${endColor})`);
</script>

<template>
  <div class="p-16px rounded-8px c-white" :style="{ background: gradientStyle }">
    <slot></slot>
  </div>
</template>
