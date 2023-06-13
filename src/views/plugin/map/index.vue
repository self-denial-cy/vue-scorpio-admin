<script setup lang="ts">
import type { Component } from 'vue';
import { BaiduMap, GaodeMap } from './components';

defineOptions({
  name: 'map'
});

interface Map {
  id: string;
  label: string;
  component: Component;
}

const maps: Map[] = [
  {
    id: 'baidu',
    label: '百度地图',
    component: BaiduMap
  },
  {
    id: 'gaode',
    label: '高德地图',
    component: GaodeMap
  }
];
</script>

<template>
  <div class="h-full map">
    <ElCard class="h-full flex flex-col">
      <template #header>
        <span class="text-18px">百度地图/高德地图</span>
      </template>
      <ElTabs model-value="baidu" class="h-full flex flex-col">
        <ElTabPane v-for="item in maps" :key="item.id" class="h-full" :label="item.label" :name="item.id">
          <div class="h-full">
            <component :is="item.component"></component>
          </div>
        </ElTabPane>
      </ElTabs>
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
