<script setup lang="ts">
defineOptions({
  name: 'Base'
});
</script>

<template>
  <!-- TODO 折叠布局 -->
  <div class="flex h-full">
    <div class="fixed w-full h-56px z-1001 bg-white s-transition header" :class="{ expand: true }">
      <slot name="header"></slot>
    </div>
    <div class="fixed w-full h-44px z-1000 top-56px bg-white s-transition taber" :class="{ expand: true }">
      <slot name="taber"></slot>
    </div>
    <div class="h-full z-1003 shrink-0 s-transition sidebar" :class="{ expand: true }">
      <slot name="sidebar"></slot>
    </div>
    <div class="pt-100px pb-48px w-full overflow-auto s-transition">
      <slot></slot>
    </div>
    <div class="fixed z-998 h-48px w-full bottom-0 bg-white s-transition footer" :class="{ expand: true }">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.expand.header {
  padding-left: 220px;
}
.expand.taber {
  padding-left: 220px;
}
.expand.sidebar {
  width: 220px;
}
.expand.footer {
  padding-left: 220px;
}
</style>
