<script setup lang="ts">
import { HoverItem } from '@/layout/shared';
import { useFullscreen } from '@vueuse/core';

defineOptions({
  name: 'Fullscreen'
});

const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <HoverItem class="w-40px h-full" :content="isFullscreen ? '退出全屏' : '打开全屏'" @click="toggle">
    <i-mdi-fullscreen v-if="!isFullscreen" class="text-28px dark:c-dark-info"></i-mdi-fullscreen>
    <i-mdi-fullscreen-exit v-else class="text-28px dark:c-dark-info"></i-mdi-fullscreen-exit>
  </HoverItem>
</template>
