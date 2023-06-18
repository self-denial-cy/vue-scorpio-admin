<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import BScroll from '@better-scroll/core';
import type { Options } from '@better-scroll/core';

interface Props {
  options: Options;
}

const props = defineProps<Props>();

defineOptions({
  name: 'BetterScroll'
});

// 横向滚动，限制滚动区域的高度；竖向滚动，滚动区域高度自适应
const isScrollY = computed(() => !!props.options.scrollY);

const wrapper = ref<HTMLDivElement>();
const scroller = ref<HTMLDivElement>();
const instance = ref<BScroll>();

onMounted(() => {
  if (!wrapper.value || !scroller.value) return;
  // 初始化 BScroll 实例
  instance.value = new BScroll(wrapper.value, props.options);
});

// 滚动容器和滚动区域的宽高变化时，刷新 BScroll 实例
const { width: wrapperWidth, height: wrapperHeight } = useElementSize(wrapper);
const { width: scrollerWidth, height: scrollerHeight } = useElementSize(scroller);
watch(
  [() => wrapperWidth.value, () => wrapperHeight.value, () => scrollerWidth.value, () => scrollerHeight.value],
  () => {
    if (instance.value) {
      instance.value.refresh();
    }
  }
);
</script>

<template>
  <div ref="wrapper" class="h-full">
    <div ref="scroller" class="inline-block" :class="{ 'h-full': !isScrollY }">
      <slot></slot>
    </div>
  </div>
</template>
