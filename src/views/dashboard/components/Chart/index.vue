<script setup lang="ts">
defineOptions({
  name: 'Chart'
});
</script>

<template>
  <ElRow :gutter="16">
    <ElCol :span="16" :xs="24">
      <ElCard header="Statistics" class="custom-card">
        <div ref="lineRef" class="h-360px"></div>
      </ElCard>
    </ElCol>
    <ElCol :span="8" :xs="24">
      <ElCard header="Customer Feedback" class="custom-card">
        <div ref="pieRef" class="h-360px"></div>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<style lang="less" scoped>
.custom-card {
  :deep(.el-card__body) {
    padding-top: 0;
  }
  :deep(.el-card__header) {
    border-bottom: none;
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
