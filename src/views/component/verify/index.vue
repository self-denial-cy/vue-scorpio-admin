<script setup lang="ts">
import { DragVerify } from './components';
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">人机验证</span>
      </template>
      <DragVerify></DragVerify>
    </ElCard>
  </div>
</template>
