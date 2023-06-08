<script setup lang="ts">
import { useRouteStore, useThemeStore } from '@/stores';

defineOptions({
  name: 'Blank'
});

const { caches } = $(useRouteStore());

useThemeStore();
</script>

<template>
  <div class="h-full bg-#f6f9f8 dark:bg-#101014">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" appear>
        <KeepAlive :include="caches">
          <component :is="Component" :key="route.fullPath"></component>
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>
