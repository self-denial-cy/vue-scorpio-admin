<script setup lang="ts">
import { useReloadStore, useRouteStore } from '@/stores';

defineOptions({
  name: 'Bulk'
});

const { flag } = $(useReloadStore());
const { caches } = $(useRouteStore());
</script>

<template>
  <div class="p-16px min-h-full bg-#f6f9f8 dark:bg-#101014">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" appear>
        <KeepAlive :include="caches">
          <component :is="Component" v-if="flag" :key="route.fullPath"></component>
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>
