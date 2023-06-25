<script setup lang="ts">
import { DragVerify, RotateVerify } from './components';
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">人机验证</span>
      </template>
      <div class="flex justify-center items-center flex-wrap">
        <DragVerify></DragVerify>
        <RotateVerify></RotateVerify>
      </div>
    </ElCard>
  </div>
</template>
