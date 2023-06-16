<script setup lang="ts">
import { useExcel, type ExcelData } from '@/composables';

defineOptions({
  name: 'ImportExcel'
});

interface Emits {
  (event: 'start'): void;
  (event: 'success', data: ExcelData[]): void;
  (event: 'error', err: unknown): void;
  (event: 'cancel'): void;
}

const emit = defineEmits<Emits>();

const inputRef = $ref<HTMLInputElement | null>(null);
let isCancel = $ref<boolean>(true);

function triggerUpload() {
  if (inputRef) {
    isCancel = true;
    inputRef.click();
    emit('start'); // 启动钩子，可用于开启 loading
    window.addEventListener('mouseover', handleMouseOverChange, { once: true }); // hack 方法用于监听 file 选择是否取消
  }
}

function handleMouseOverChange() {
  if (isCancel) {
    emit('cancel'); // 触发 cancel
  }
}

function handleFileChange(event: Event) {
  const target = event && (event.target as HTMLInputElement);
  const files = target.files;
  const file = files && files[0];
  target.value = ''; // file 两次选择了同一文件，会导致 change 事件不会被触发
  if (!file) return;
  isCancel = false;
  parse(file);
}

async function parse(file: File) {
  const { fileParse } = useExcel();
  try {
    let excelData: ExcelData[] = await fileParse(file);
    // 过滤下空的 sheet
    excelData = excelData.filter((_) => !!(_.result && _.result.length));
    emit('success', excelData);
  } catch (err) {
    emit('error', err);
  }
}
</script>

<template>
  <div>
    <input ref="inputRef" type="file" accept=".xlsx,.xls" class="display-none" @change="handleFileChange" />
    <div class="w-fit" @click="triggerUpload">
      <slot></slot>
    </div>
  </div>
</template>
