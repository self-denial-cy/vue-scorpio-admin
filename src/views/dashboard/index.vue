<script setup lang="ts">
import { CardGroup, Chart } from './components';

defineOptions({
  name: 'dashboard' // 保证与路由 name 一致，且开启缓存
});
</script>

<template>
  <CardGroup></CardGroup>
  <Chart class="mt-16px"></Chart>
</template>
