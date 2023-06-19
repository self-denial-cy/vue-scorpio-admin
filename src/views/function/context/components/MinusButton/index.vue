<script setup lang="ts">
import { useCountContext } from '@/context';

const { useInject } = useCountContext();
const { count, setCount } = useInject();
</script>

<template>
  <ElButton type="danger" plain @click="setCount(count - 1)">{{ count }}</ElButton>
</template>
