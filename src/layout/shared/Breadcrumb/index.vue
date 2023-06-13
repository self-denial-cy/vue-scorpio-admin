<script setup lang="ts">
import { useRouteStore } from '@/stores';
import { getBreadcrumbs } from '@/helpers';

defineOptions({
  name: 'Breadcrumb'
});

const route = useRoute();
const { menus } = $(useRouteStore());
const breadcrumbs = computed(() => getBreadcrumbs(route.name, menus));
</script>

<template>
  <ElBreadcrumb>
    <ElBreadcrumbItem v-for="item in breadcrumbs" :key="item.key">
      <ElIcon v-if="item.icon" class="w-16px! h-16px! vertical-bottom dark:c-dark-info">
        <Icon :icon="item.icon"></Icon>
      </ElIcon>
      <span class="pl-4px dark:c-dark-info">{{ item.label }}</span>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
