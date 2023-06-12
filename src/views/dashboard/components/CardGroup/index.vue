<script setup lang="ts">
import { GradientBg } from './components';
import { Icon } from '@/layout/shared';

defineOptions({
  name: 'CardGroup'
});

interface ICard {
  id: string | number;
  title: string;
  unit: string;
  count: number;
  subTitle: string;
  subUnit: string;
  subCount: number;
  startColor: string;
  endColor: string;
  icon: string;
}

const cards: ICard[] = [
  {
    id: 'order',
    title: 'Orders Received',
    unit: '',
    count: 486,
    subTitle: 'Completed Orders',
    subUnit: '',
    subCount: 351,
    startColor: '#449dff',
    endColor: '#66afff',
    icon: 'ep-goods'
  },
  {
    id: 'soles',
    title: 'Total Soles',
    unit: '',
    count: 1641,
    subTitle: 'This Month',
    subUnit: '',
    subCount: 213,
    startColor: '#3bdbbc',
    endColor: '#55e0c5',
    icon: 'ep-discount'
  },
  {
    id: 'revenue',
    title: 'Revenue',
    unit: '$',
    count: 42562,
    subTitle: 'This Month',
    subUnit: '$',
    subCount: 5032,
    startColor: '#feb649',
    endColor: '#ffc874',
    icon: 'ep-refresh'
  },
  {
    id: 'profit',
    title: 'Total Profit',
    unit: '$',
    count: 9562,
    subTitle: 'This Month',
    subUnit: '$',
    subCount: 542,
    startColor: '#ff5170',
    endColor: '#ff7b91',
    icon: 'ep-wallet'
  }
];
</script>

<template>
  <ElRow :gutter="16">
    <ElCol v-for="item in cards" :key="item.id" :span="24 / cards.length" :xs="24">
      <GradientBg class="h-120px layout" :start-color="item.startColor" :end-color="item.endColor">
        <span style="grid-area: title" class="text-14px font-bold">{{ item.title }}</span>
        <div style="grid-area: blank"></div>
        <div style="grid-area: icon" class="flex items-center">
          <ElIcon class="w-24px! h-24px!">
            <Icon :icon="item.icon" class="text-24px"></Icon>
          </ElIcon>
        </div>
        <CountTo
          class="flex justify-end text-24px font-bold"
          style="grid-area: count"
          :prefix="item.unit"
          :start-value="1"
          :end-value="item.count"
        ></CountTo>
        <span style="grid-area: sub-title" class="text-14px">{{ item.subTitle }}</span>
        <span style="grid-area: sub-count" class="flex justify-end text-16px">{{ item.subCount }}</span>
      </GradientBg>
    </ElCol>
  </ElRow>
</template>

<style lang="less" scoped>
.layout {
  display: grid;
  grid-template:
    'title blank'
    'icon count'
    'sub-title sub-count';
}
</style>
