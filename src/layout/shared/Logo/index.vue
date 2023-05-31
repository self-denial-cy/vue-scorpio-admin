<script setup lang="ts">
// TODO 展开收缩布局样式变化
defineOptions({
  name: 'Logo'
});

interface Props {
  showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: true
});
</script>

<template>
  <RouterLink to="/" class="flex justify-center items-center">
    <div v-if="showTitle" class="c-#2d8cf0 text-16px font-bold break-keep">圣火喵喵</div>
  </RouterLink>
</template>
