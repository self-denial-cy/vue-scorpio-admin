<script setup lang="ts">
import { Base, Sidebar, Footer } from '@/layout/shared';

defineOptions({
  name: 'Main'
});
</script>

<template>
  <Base>
    <template #header></template>
    <template #taber></template>
    <template #sidebar>
      <Sidebar></Sidebar>
    </template>
    <template #default></template>
    <template #footer>
      <Footer></Footer>
    </template>
  </Base>
</template>
