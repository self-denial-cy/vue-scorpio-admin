<script setup lang="ts">
import { Logo } from '@/layout/shared';

defineOptions({
  name: 'Sidebar'
});
</script>

<template>
  <div class="w-full h-full flex-col dark:bg-black sidebar">
    <Logo class="h-56px py-10px px-5px s-transition"></Logo>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
  box-shadow: 1.95px 1.95px 2.6px rgba(0, 0, 0, 0.15);
}
</style>
