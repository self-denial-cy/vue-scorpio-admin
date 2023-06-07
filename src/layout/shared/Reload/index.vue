<script setup lang="ts">
import { HoverItem } from '@/layout/shared';
import { useLoading } from '@/hooks';
import { useReloadStore } from '@/stores';

defineOptions({
  name: 'Reload'
});

const { reload } = useReloadStore();
const { loading, startLoading, endLoading } = useLoading();

function refresh() {
  startLoading();
  reload();
  setTimeout(() => {
    endLoading();
  }, 1000);
}
</script>

<template>
  <HoverItem class="w-50px h-full" content="刷新" @click="refresh">
    <ElIcon class="w-32px! h-32px! dark:c-dark-info">
      <i-ep-refresh class="text-24px" :class="{ 'animate-spin': loading }"></i-ep-refresh>
    </ElIcon>
  </HoverItem>
</template>
