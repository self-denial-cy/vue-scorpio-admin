<script setup lang="ts">
import { useGlobalEvents } from '@/composables';

// 绑定全局事件
useGlobalEvents();

// 捕获错误
onErrorCaptured((err, instance, info) => {
  console.log('[errorCaptured]', err, instance, info);
  return false; // 停止向上传播
});
</script>

<template>
  <ElConfigProvider>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback>
            <Loading></Loading>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </ElConfigProvider>
</template>
