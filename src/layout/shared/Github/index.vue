<script setup lang="ts">
import { HoverItem } from '@/layout/shared';

defineOptions({
  name: 'Github'
});

function SiteJump() {
  window.open('https://github.com/self-denial-cy/vue-scorpio-admin', '_blank');
}
</script>

<template>
  <HoverItem content="GitHub" class="w-40px h-full" @click="SiteJump">
    <i-mdi-github class="text-22px"></i-mdi-github>
  </HoverItem>
</template>
