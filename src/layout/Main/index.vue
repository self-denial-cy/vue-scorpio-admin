<script setup lang="ts">
import { Base, Sidebar, Footer, Header, Taber } from '@/layout/shared';

defineOptions({
  name: 'Main'
});
</script>

<template>
  <Base>
    <template #header>
      <Header></Header>
    </template>
    <template #taber>
      <Taber></Taber>
    </template>
    <template #sidebar>
      <Sidebar></Sidebar>
    </template>
    <template #default></template>
    <template #footer>
      <Footer></Footer>
    </template>
  </Base>
</template>
