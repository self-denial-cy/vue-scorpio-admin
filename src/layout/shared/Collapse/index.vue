<script setup lang="ts">
import { useCollapseStore } from '@/stores';

defineOptions({
  name: 'Collapse'
});

const { collapse, toggleCollapse } = $(useCollapseStore());
</script>

<template>
  <div class="flex items-center pr-16px" @click="toggleCollapse">
    <ElIcon class="w-20px! h-20px! cursor-pointer dark:c-dark-info">
      <i-ep-fold v-if="!collapse" class="text-20px"></i-ep-fold>
      <i-ep-expand v-else class="text-20px"></i-ep-expand>
    </ElIcon>
  </div>
</template>
