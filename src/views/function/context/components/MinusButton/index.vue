<script setup lang="ts">
import { useCountContext } from '@/context';
import PlusButton from '../PlusButton/index.vue';

const { useInject } = useCountContext();
const { count, setCount } = useInject();
</script>

<template>
  <div class="mb-16px">
    <ElButton type="danger" plain @click="setCount(count - 1)">{{ count }}</ElButton>
    <slot></slot>
  </div>
  <PlusButton>
    <ElTag class="ml-8px">孙</ElTag>
  </PlusButton>
</template>
