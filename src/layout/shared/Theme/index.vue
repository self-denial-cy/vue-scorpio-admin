<script setup lang="ts">
import { useThemeStore } from '@/stores';
import { HoverItem } from '@/layout/shared';

defineOptions({
  name: 'Theme'
});

const { isDark, toggleDark } = useThemeStore();
</script>

<template>
  <HoverItem content="切换主题" class="w-40px h-full" @click="toggleDark()">
    <i-mdi-weather-night v-if="isDark" class="text-24px c-dark-info"></i-mdi-weather-night>
    <i-mdi-weather-sunny v-else class="text-26px"></i-mdi-weather-sunny>
  </HoverItem>
</template>
