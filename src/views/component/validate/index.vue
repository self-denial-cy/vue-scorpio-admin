<script setup lang="ts">
import { BasicValidate } from './components';
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">表单规则校验</span>
      </template>
      <BasicValidate></BasicValidate>
    </ElCard>
  </div>
</template>
