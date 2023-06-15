import type { App, Directive } from 'vue';
import { useClipboard } from '@vueuse/core';

export default function setupClipboardDirective(app: App) {
  app.directive('clipboard', clipboardDirective);
}

let val = '';

export type ClipboardDirective = Directive<HTMLElement, string>;

const clipboardDirective: ClipboardDirective = {
  mounted(el, binding) {
    val = binding.value;
    el.addEventListener('click', onClick);
  },
  updated(el, binding) {
    console.log(el);
    val = binding.value;
  },
  beforeUnmount(el) {
    el.removeEventListener('click', onClick);
  }
};

function onClick() {
  handleCopy(val);
}

function handleCopy(val: string) {
  const { copy, isSupported } = useClipboard();
  if (!isSupported) {
    ElMessage.error('Your browser does not support Clipboard API');
    return;
  }
  if (!val) {
    ElMessage.warning('请输入要复制的文本内容');
    return;
  }
  copy(val);
  ElMessage.success(`复制成功：${val}`);
}
