<script setup lang="ts">
import { useCountContext } from '@/context';
import { PlusButton, MinusButton } from './components';

const { useProvide } = useCountContext();

const { count } = useProvide();
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">共享上下文</span>
      </template>
      <div class="mb-16px">
        <ElInputNumber v-model="count"></ElInputNumber>
        <ElTag class="ml-8px">父</ElTag>
      </div>
      <div class="mb-16px">
        <PlusButton></PlusButton>
        <ElTag class="ml-8px">子</ElTag>
        <ElTag type="warning" class="ml-8px">兄</ElTag>
      </div>
      <div>
        <MinusButton></MinusButton>
        <ElTag class="ml-8px">子</ElTag>
        <ElTag type="warning" class="ml-8px">弟</ElTag>
      </div>
    </ElCard>
  </div>
</template>
