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
    <ElTabs model-value="home" stretch class="flex flex-col">
      <ElTabPane v-for="item in statisticsTables" :key="item.id" :name="item.id"></ElTabPane>
    </ElTabs>
  </ElCard>
</template>
