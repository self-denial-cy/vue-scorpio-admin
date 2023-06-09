<script setup lang="ts">
import { CardGroup } from './components';

defineOptions({
  name: 'dashboard' // 保证与路由 name 一致，且开启缓存
});
</script>

<template>
  <ElSpace class="w-full" direction="vertical">
    <CardGroup></CardGroup>
  </ElSpace>
</template>
