<script setup lang="ts">
defineOptions({
  name: 'DarkModeContainer'
});
</script>

<template>
  <div class="dark:bg-dark dark:c-dark-info s-transition">
    <slot></slot>
  </div>
</template>
