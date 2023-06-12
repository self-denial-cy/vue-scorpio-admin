<script setup lang="ts">
import { CardGroup, Chart, TableGroup } from './components';

defineOptions({
  name: 'dashboard' // 保证与路由 name 一致，且开启缓存
});
</script>

<template>
  <div class="dashboard">
    <!-- 根节点最好是一个实际元素，否则会出现白屏异常 -->
    <CardGroup></CardGroup>
    <Chart class="mt-16px"></Chart>
    <TableGroup class="mt-16px"></TableGroup>
  </div>
</template>
