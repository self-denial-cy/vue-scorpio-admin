<script setup lang="ts">
defineOptions({
  name: 'SidebarItem'
});

interface Props {
  menu: MenuRecord;
}

defineProps<Props>();
</script>

<template>
  <ElMenuItem v-if="!menu.children || !menu.children.length" :key="menu.key" :index="menu.path">
    <ElIcon v-if="menu.icon"><Icon :icon="menu.icon"></Icon></ElIcon>
    <template #title>
      <span class="ellipsis font-bold">{{ menu.label }}</span>
    </template>
  </ElMenuItem>
  <ElSubMenu v-else :index="menu.path">
    <template #title>
      <ElIcon v-if="menu.icon"><Icon :icon="menu.icon"></Icon></ElIcon>
      <span class="ellipsis font-bold">{{ menu.label }}</span>
    </template>
    <ElMenuItemGroup>
      <SidebarItem v-for="item in menu.children" :key="item.key" :menu="item"></SidebarItem>
    </ElMenuItemGroup>
  </ElSubMenu>
</template>

<style scoped>
.ellipsis {
  overflow: hidden;
  padding-right: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
