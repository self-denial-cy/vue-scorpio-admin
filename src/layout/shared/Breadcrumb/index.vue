<script setup lang="ts">
import { useRouteStore } from '@/stores';
import { getBreadcrumbs } from '@/helpers';
import { Icon } from '@/layout/shared';

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
      <ElIcon v-if="item.icon" class="w-16px! h-16px! vertical-bottom">
        <Icon :icon="item.icon"></Icon>
      </ElIcon>
      <span class="pl-2px">{{ item.label }}</span>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
