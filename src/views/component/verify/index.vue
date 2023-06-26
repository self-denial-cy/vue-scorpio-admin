<script setup lang="ts">
import { DragVerifyExample, RotateVerifyExample, RandomCodeVerifyExample } from './components';
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">人机验证</span>
      </template>
      <div class="flex justify-center items-center flex-wrap">
        <DragVerifyExample></DragVerifyExample>
        <RotateVerifyExample></RotateVerifyExample>
        <RandomCodeVerifyExample></RandomCodeVerifyExample>
      </div>
    </ElCard>
  </div>
</template>
