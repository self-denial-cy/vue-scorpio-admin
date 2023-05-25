<script setup lang="ts"></script>

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
