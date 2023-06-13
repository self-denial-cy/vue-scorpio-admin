<script setup lang="ts">
defineOptions({
  name: 'map'
});
</script>

<template>
  <div class="h-full map">
    <ElCard class="h-full flex flex-col">
      <template #header>
        <span class="text-18px">百度地图/高德地图</span>
      </template>
      <ElTabs class="h-full flex flex-col"> </ElTabs>
    </ElCard>
  </div>
</template>

<style lang="less" scoped>
.map {
  :deep(.el-card__body) {
    flex: 1;
  }
  :deep(.el-tabs__content) {
    flex: 1;
  }
}
</style>
