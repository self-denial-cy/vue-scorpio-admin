<script setup lang="ts">
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
    <ElIcon class="w-24px! h-24px!"><Logo class="text-24px"></Logo></ElIcon>
    <div v-if="showTitle" class="title pl-5px text-18px font-bold break-keep">圣火喵喵</div>
  </RouterLink>
</template>

<style scoped>
.title {
  /* 提取 element-plus 的主题色 */
  color: var(--el-color-primary);
}
</style>
