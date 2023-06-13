<script setup lang="ts">
import { useTabStore } from '@/stores';
import type { TabsPaneContext, TabPaneName } from 'element-plus';

defineOptions({
  name: 'Tabs'
});

const { tabs, _active, handleTabClick: _handleTabClick, removeTab } = $(useTabStore());

function handleTabClick(pane: TabsPaneContext) {
  _handleTabClick(pane.paneName as string);
}

function handleTabRemove(name: TabPaneName) {
  removeTab(name as string);
}
</script>

<template>
  <ElTabs
    :model-value="_active"
    type="card"
    tab-position="bottom"
    class="tabs h-full pl-20px flex items-center"
    @tab-click="handleTabClick"
    @tab-remove="handleTabRemove"
  >
    <ElTabPane v-for="item in tabs" :key="item.fullPath" :name="item.fullPath" :closable="!item.meta.isHome">
      <template #label>
        <span class="flex items-center gap-10px">
          <ElIcon v-if="item.meta.icon" class="vertical-middle">
            <Icon :icon="item.meta.icon"></Icon>
          </ElIcon>
          <span>{{ item.meta.title }}</span>
        </span>
      </template>
    </ElTabPane>
  </ElTabs>
</template>
