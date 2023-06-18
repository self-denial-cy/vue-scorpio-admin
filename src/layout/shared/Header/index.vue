<script setup lang="ts">
import { Collapse, Breadcrumb, Github, Fullscreen, Theme, Avatar } from '@/layout/shared';
import { useLayout } from '@/composables';

defineOptions({
  name: 'Header'
});

const { isMobile } = useLayout();
</script>

<template>
  <div class="header h-full flex items-center pl-10px pr-15px dark:bg-dark">
    <div class="flex items-center flex-1 overflow-hidden h-full">
      <Collapse></Collapse>
      <Breadcrumb v-if="!isMobile"></Breadcrumb>
    </div>
    <div class="flex items-center justify-end gap-10px h-full">
      <Github></Github>
      <Fullscreen></Fullscreen>
      <Theme></Theme>
      <Avatar></Avatar>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
</style>
