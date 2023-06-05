<script setup lang="ts">
import { useCollapseStore } from '@/stores';

defineOptions({
  name: 'Base'
});

const { collapse } = $(useCollapseStore());
</script>

<template>
  <!-- TODO 暗黑主题样式 -->
  <div class="flex h-full">
    <div class="fixed w-full h-56px z-1001 bg-white s-transition header" :class="{ expand: !collapse }">
      <slot name="header"></slot>
    </div>
    <div class="fixed w-full h-44px z-1000 top-56px bg-white s-transition taber" :class="{ expand: !collapse }">
      <slot name="taber"></slot>
    </div>
    <div class="h-full z-1003 shrink-0 s-transition sidebar" :class="{ expand: !collapse }">
      <slot name="sidebar"></slot>
    </div>
    <div class="pt-100px pb-48px w-full overflow-auto s-transition">
      <slot></slot>
    </div>
    <div class="fixed z-998 h-48px w-full bottom-0 bg-white s-transition footer" :class="{ expand: !collapse }">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding-left: 64px;
}
.expand.header {
  padding-left: 220px;
}
.taber {
  padding-left: 64px;
}
.expand.taber {
  padding-left: 220px;
}
.sidebar {
  width: 64px;
}
.expand.sidebar {
  width: 220px;
}
.footer {
  padding-left: 64px;
}
.expand.footer {
  padding-left: 220px;
}
</style>
