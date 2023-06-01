<script setup lang="ts">
import { Logo, SidebarItem } from '@/layout/shared';
import { useRouteStore } from '@/stores';
import bennyJSON from '@/assets/animations/benny.json';

defineOptions({
  name: 'Sidebar'
});

const routeStore = useRouteStore();
const route = useRoute();

const menus = computed(() => routeStore.menus);
const activeRoute = computed(() => route.path);
</script>

<template>
  <div class="w-full h-full flex-col dark:bg-black sidebar">
    <Logo class="h-56px py-10px px-5px s-transition"></Logo>
    <ElScrollbar class="scrollbar">
      <ElMenu class="flex-1 b-0 p-5px" router :default-active="activeRoute">
        <SidebarItem v-for="menu in menus" :key="menu.key" :menu="menu"></SidebarItem>
      </ElMenu>
    </ElScrollbar>
    <div class="h-234px">
      <Lottie :animation-data="bennyJSON"></Lottie>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
  box-shadow: 1.95px 1.95px 2.6px rgba(0, 0, 0, 0.15);
}
.scrollbar {
  height: calc(~'100% - 290px');
}
</style>
