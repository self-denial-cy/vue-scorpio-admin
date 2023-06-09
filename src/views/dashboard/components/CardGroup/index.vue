<script setup lang="ts">
import type { ElCol } from 'element-plus';

defineOptions({
  name: 'CardGroup'
});
</script>

<template>
  <ElRow>
    <ElCol :span="6"></ElCol>
    <ElCol :span="6"></ElCol>
    <ElCol :span="6"></ElCol>
    <ElCol :span="6"></ElCol>
  </ElRow>
</template>
