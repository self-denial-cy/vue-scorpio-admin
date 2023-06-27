<script setup lang="ts">
import { Logo, SidebarItem } from '@/layout/shared';
import { useRouteStore, useCollapseStore } from '@/stores';
import bennyJSON from '@/assets/animations/benny.json';

defineOptions({
  name: 'Sidebar'
});

const { collapse } = $(useCollapseStore());

const routeStore = useRouteStore();
const route = useRoute();

const menus = computed(() => routeStore.menus);
const activeRoute = computed(() => route.path);
</script>

<template>
  <div class="w-full h-full flex-col dark:bg-dark sidebar">
    <Logo :show-title="!collapse" class="h-56px py-10px px-5px s-transition"></Logo>
    <ElScrollbar class="scrollbar" :class="{ expand: !collapse }">
      <ElMenu class="flex-1 b-0 py-5px" router :default-active="activeRoute" :collapse="collapse">
        <SidebarItem v-for="menu in menus" :key="menu.key" :menu="menu"></SidebarItem>
      </ElMenu>
    </ElScrollbar>
    <div v-if="!collapse" class="h-234px">
      <Lottie :animation-data="bennyJSON"></Lottie>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.15);
  :deep(.el-menu) {
    border-right: none;
  }
}
.expand.scrollbar {
  height: calc(~'100% - 290px');
}
.scrollbar {
  height: calc(~'100% - 56px');
}
</style>
