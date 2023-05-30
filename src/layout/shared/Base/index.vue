<script setup lang="ts">
defineOptions({
  name: 'Base'
});
</script>

<template>
  <div class="flex h-full">
    <div class="fixed w-full h-64px z1000 bg-white s-transition">
      <slot name="header"></slot>
    </div>
  </div>
</template>
