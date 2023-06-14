<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

defineOptions({
  name: 'clipboard'
});

const text = $ref('');
const type = $ref('method');

const { copy, isSupported } = useClipboard();

function handleMethodCopy() {
  if (!isSupported) {
    ElMessage.error('Your browser does not support Clipboard API');
    return;
  }
  if (!text) {
    ElMessage.warning('请输入要复制的文本内容');
    return;
  }
  copy(text);
  ElMessage.success(`复制成功：${text}`);
}
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">剪切板</span>
      </template>
      <ElInput
        v-model="text"
        clearable
        size="large"
        type="text"
        maxlength="16"
        show-word-limit
        placeholder="请输入要复制的文本内容"
      >
        <template #prepend>
          <ElSelect v-model="type" size="large" placeholder="请选择复制方式" class="w-120px">
            <ElOption label="函数方式" value="method"></ElOption>
            <ElOption label="指令方式" value="directive"></ElOption>
          </ElSelect>
        </template>
        <template #append>
          <ElButton v-if="type === 'method'" size="large" @click="handleMethodCopy">
            <ElIcon class="w-16px! h-16px!">
              <i-ep-document-copy class="text-16px"></i-ep-document-copy>
            </ElIcon>
          </ElButton>
          <ElButton v-if="type === 'directive'" size="large">
            <ElIcon class="w-16px! h-16px!">
              <i-ep-document-copy class="text-16px"></i-ep-document-copy>
            </ElIcon>
          </ElButton>
        </template>
      </ElInput>
    </ElCard>
  </div>
</template>
