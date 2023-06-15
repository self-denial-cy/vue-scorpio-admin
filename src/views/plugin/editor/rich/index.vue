<script setup lang="ts">
import E from 'wangeditor';

defineOptions({
  name: 'rich'
});

let editor = $ref<E | null>(null);
const domRef = $ref<HTMLDivElement | null>(null);

function renderEditor() {
  if (!domRef) return;
  editor = new E(domRef);
  editor.config.height = 500;
  editor.config.zIndex = 10;
  editor.config.showFullScreen = false;
  editor.create();
}

onMounted(() => {
  renderEditor();
});

onUnmounted(() => {
  editor?.destroy();
});
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">富文本</span>
      </template>
      <SiteLink label="Github" href="https://github.com/wangeditor-team/wangEditor"></SiteLink>
      <div ref="domRef" class="mt-24px editor"></div>
    </ElCard>
  </div>
</template>

<style lang="less" scoped>
// 背景色适配暗黑模式
.editor {
  :deep(.w-e-toolbar) {
    background-color: inherit !important;
  }
  :deep(.w-e-text-container) {
    background-color: inherit !important;
  }
  :deep(.w-e-menu-panel) {
    background-color: inherit !important;
  }
}
</style>
