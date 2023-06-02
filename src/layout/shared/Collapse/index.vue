<script setup lang="ts">
import { useCollapseStore } from '@/stores';

defineOptions({
  name: 'Collapse'
});

const { collapse, toggleCollapse } = $(useCollapseStore());
</script>

<template>
  <div @click="toggleCollapse">
    <ElIcon class="w-40px! h-56px! cursor-pointer dark:c-dark-info">
      <i-ep-fold v-if="!collapse" class="text-20px"></i-ep-fold>
      <i-ep-expand v-else class="text-20px"></i-ep-expand>
    </ElIcon>
  </div>
</template>
