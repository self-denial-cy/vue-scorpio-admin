<script setup lang="ts">
import type { Component } from 'vue';
import { TableItem } from './components';

defineOptions({
  name: 'TableGroup'
});

interface StatisticsTable {
  id: string;
  icon: string;
  label: string;
  component: Component;
}

const statisticsTables: StatisticsTable[] = [
  { id: 'home', icon: 'ep-home-filled', label: 'Home', component: TableItem },
  { id: 'security', icon: 'ep-key', label: 'Security', component: TableItem },
  { id: 'entertainment', icon: 'ep-video-play', label: 'Entertainment', component: TableItem },
  { id: 'big-data', icon: 'ep-coin', label: 'Big Data', component: TableItem }
];
</script>

<template>
  <ElCard>
    <ElTabs model-value="home" stretch>
      <ElTabPane v-for="item in statisticsTables" :key="item.id" :name="item.id">
        <template #label>
          <span>
            <ElIcon class="w-18px! h-18px! vertical-sub">
              <Icon :icon="item.icon" class="text-18px"></Icon>
            </ElIcon>
            <span class="ml-8px">{{ item.label }}</span>
          </span>
        </template>
        <div>
          <component :is="item.component"></component>
        </div>
      </ElTabPane>
    </ElTabs>
  </ElCard>
</template>
