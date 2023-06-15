<script setup lang="ts">
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useThemeStore } from '@/stores';

defineOptions({
  name: 'markdown'
});

const { isDark } = $(useThemeStore());
let vditor = $ref<Vditor | null>(null);
const domRef = $ref<HTMLDivElement | null>(null);

function renderVditor() {
  if (!domRef) return;
  vditor = new Vditor(domRef, {
    minHeight: 500,
    theme: isDark ? 'dark' : 'classic',
    cache: {
      enable: false
    },
    toolbar: [
      'emoji',
      'headings',
      'bold',
      'italic',
      'strike',
      'link',
      '|',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      '|',
      'quote',
      'line',
      'code',
      'inline-code',
      'insert-before',
      'insert-after',
      '|',
      'upload',
      'record',
      'table',
      '|',
      'undo',
      'redo',
      '|',
      'edit-mode',
      {
        name: 'more',
        toolbar: ['both', 'code-theme', 'content-theme', 'export', 'outline', 'preview', 'devtools', 'info', 'help']
      }
    ]
  });
}

const stopThemeWatch = watch($$(isDark), (newVal) => {
  vditor?.setTheme(newVal ? 'dark' : 'classic');
});

onMounted(() => {
  renderVditor();
});

onUnmounted(() => {
  stopThemeWatch();
  vditor?.destroy();
});
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">Markdown</span>
      </template>
      <SiteLink label="Github" href="https://github.com/Vanessa219/vditor"></SiteLink>
      <div ref="domRef" class="mt-24px"></div>
    </ElCard>
  </div>
</template>
