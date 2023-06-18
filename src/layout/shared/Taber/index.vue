<script setup lang="ts">
import { useTabStore } from '@/stores';
import { Tabs, Reload } from '@/layout/shared';

defineOptions({
  name: 'Taber'
});

const route = useRoute();
const tabStore = useTabStore();
tabStore.init(route); // 初始化 Tab Store

// 监听当前路由的 fullPath，以更新 Tab Store
watch(
  () => route.fullPath,
  () => {
    tabStore.addTab(route);
    tabStore.setActive(route.fullPath);
  }
);
</script>

<template>
  <div class="taber h-full flex flex-1 justify-between overflow-hidden dark:bg-dark">
    <div class="flex-1 overflow-hidden h-full">
      <BetterScroll :options="{ scrollX: true, scrollY: false, click: true }">
        <Tabs></Tabs>
      </BetterScroll>
    </div>
    <Reload></Reload>
  </div>
</template>

<style lang="less" scoped>
.taber {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
</style>
