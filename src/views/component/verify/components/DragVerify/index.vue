<script setup lang="ts">
import type { Result } from '@/components/DragVerify.vue';

const ref1 = ref<Helper.Nullable<Expose.DragVerify>>(null);
const ref2 = ref<Helper.Nullable<Expose.DragVerify>>(null);
const ref3 = ref<Helper.Nullable<Expose.DragVerify>>(null);
const ref4 = ref<Helper.Nullable<Expose.DragVerify>>(null);
const ref5 = ref<Helper.Nullable<Expose.DragVerify>>(null);

function handleVerifySuccess(result: Result) {
  ElMessage.success(`验证成功，耗时${result.time}秒`);
}

function reset(elRef: Helper.Nullable<Expose.DragVerify>) {
  if (!elRef) return;
  elRef.resume();
}
</script>

<template>
  <div>
    <div class="flex items-center mb-24px">
      <DragVerify ref="ref1" @success="handleVerifySuccess"></DragVerify>
      <ElButton type="primary" size="large" class="ml-24px" plain @click="reset(ref1)">还原</ElButton>
    </div>
    <div class="flex items-center mb-24px">
      <DragVerify ref="ref2" circle @success="handleVerifySuccess"></DragVerify>
      <ElButton type="primary" size="large" class="ml-24px" plain @click="reset(ref2)">还原</ElButton>
    </div>
    <div class="flex items-center mb-24px">
      <DragVerify
        ref="ref3"
        text="拖动以进行验证"
        success-text="验证成功"
        :bar-style="{ 'background-color': '#018ffb' }"
        @success="handleVerifySuccess"
      ></DragVerify>
      <ElButton type="primary" size="large" class="ml-24px" plain @click="reset(ref3)">还原</ElButton>
    </div>
    <div class="flex items-center mb-24px">
      <DragVerify ref="ref4" @success="handleVerifySuccess">
        <template #action="{ passed }">
          <ElIcon v-if="passed">
            <i-ep-check class="dark:c-dark"></i-ep-check>
          </ElIcon>
          <ElIcon v-else>
            <i-ep-grape class="dark:c-dark"></i-ep-grape>
          </ElIcon>
        </template>
      </DragVerify>
      <ElButton type="primary" size="large" class="ml-24px" plain @click="reset(ref4)">还原</ElButton>
    </div>
    <div class="flex items-center">
      <DragVerify ref="ref5" @success="handleVerifySuccess">
        <template #content="{ passed }">
          <ElIcon v-if="passed">
            <i-ep-check class="dark:c-dark"></i-ep-check>
          </ElIcon>
          <ElIcon v-else>
            <i-ep-grape class="dark:c-dark"></i-ep-grape>
          </ElIcon>
        </template>
      </DragVerify>
      <ElButton type="primary" size="large" class="ml-24px" plain @click="reset(ref5)">还原</ElButton>
    </div>
  </div>
</template>
