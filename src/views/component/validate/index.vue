<script setup lang="ts">
import { BasicValidate, CustomValidate } from './components';
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">表单规则校验</span>
      </template>
      <SiteLink
        class="mb-16px"
        label="更多高级用法可参考"
        href="https://github.com/yiminghe/async-validator"
      ></SiteLink>
      <BasicValidate class="mb-16px"></BasicValidate>
      <CustomValidate></CustomValidate>
    </ElCard>
  </div>
</template>
