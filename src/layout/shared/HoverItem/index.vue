<script setup lang="ts">
defineOptions({
  name: 'HoverItem'
});

interface Props {
  content?: string; // tooltip 显式文本
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  placement: 'bottom'
});

const showTooltip = computed(() => !!props.content);
</script>

<template>
  <div v-if="showTooltip">
    <ElTooltip :placement="placement" :content="content" trigger="hover">
      <div class="flex justify-center items-center h-full cursor-pointer dark:hover:bg-#333 hover:bg-#f6f6f6">
        <slot></slot>
      </div>
    </ElTooltip>
  </div>
  <div v-else class="flex justify-center items-center h-full cursor-pointer dark:hover:bg-#333 hover:bg-#f6f6f6">
    <slot></slot>
  </div>
</template>
