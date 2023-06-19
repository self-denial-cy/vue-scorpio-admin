<script setup lang="ts">
import { useCountContext } from '@/context';

const { useInject } = useCountContext();
const { count, setCount } = useInject();
</script>

<template>
  <div>
    <ElButton type="primary" plain @click="setCount(count + 1)">{{ count }}</ElButton>
    <slot></slot>
  </div>
</template>
