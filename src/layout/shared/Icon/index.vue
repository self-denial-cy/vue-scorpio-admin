<script setup lang="ts">
import { Icon } from '@iconify/vue'; // 会从 iconify API 拉取图标数据，因此需要应用运行在在线环境

defineOptions({
  name: 'Icon'
});

interface Props {
  icon: string;
}

defineProps<Props>();

// 将传入的 class 和 style 向下传递
const attrs = useAttrs();
const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) ?? '',
  style: (attrs.style as string) ?? ''
}));
</script>

<template>
  <Icon :icon="icon" v-bind="bindAttrs"></Icon>
</template>
