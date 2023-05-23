<script setup lang="ts">
interface Props {
  prefix?: string;
  name?: string;
  fullname?: string;
  color?: string;
  width?: number;
  height?: number;
}
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  name: '',
  fullname: '',
  color: '#333',
  width: 16,
  height: 16
});
const symbolId = computed(() => `#${props.fullname ? props.fullname : `${props.prefix}-${props.name}`}`);
</script>

<template>
  <svg :width="width" :height="height" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
