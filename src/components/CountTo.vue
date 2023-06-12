<script setup lang="ts">
import { TransitionPresets, useTransition } from '@vueuse/core';
import { isNumber } from '@/utils';
import type { Ref } from 'vue';

defineOptions({
  name: 'CountTo'
});

type Transition = keyof typeof TransitionPresets;

interface Props {
  /** 起始值 */
  startValue?: number;
  /** 结束值 */
  endValue?: number;
  /** 动画时长 */
  duration?: number;
  /** 自动播放 */
  autoplay?: boolean;
  /** 进制 */
  decimals?: number;
  /** 前缀 */
  prefix?: string;
  /** 后缀 */
  suffix?: string;
  /** 分割符号 */
  separator?: string;
  /** 小数点 */
  decimal?: string;
  /** 启用缓冲动画函数 */
  useEasing?: boolean;
  /** 缓冲动画函数的类型 */
  transition?: Transition;
}

const props = withDefaults(defineProps<Props>(), {
  startValue: 0,
  endValue: 100,
  duration: 1500,
  autoplay: true,
  decimals: 0,
  prefix: '',
  suffix: '',
  separator: ',',
  decimal: '.',
  useEasing: true,
  transition: 'linear'
});

interface Emits {
  (event: 'on-started'): void;
  (event: 'on-finished'): void;
}

const emit = defineEmits<Emits>();

let source = ref(props.startValue);
let output = useTransition(source);
const value = computed(() => format(output));

function format(val: number | string | Ref<number | string>) {
  const unrefVal = unref(val);
  if (!unrefVal) return '';
  let number = String(Number(unrefVal).toFixed(props.decimals));
  const x = number.split('.');
  let x1 = x[0];
  const reg = /(\d+)(\d{3})/;
  if (props.separator && !isNumber(props.separator)) {
    while (reg.test(x1)) {
      x1 = x1.replace(reg, `$1${props.separator}$2`);
    }
  }
  const x2 = x.length > 1 ? props.decimal + x[1] : '';
  return `${props.prefix}${x1}${x2}${props.suffix}`;
}

function run() {
  output = useTransition(source, {
    duration: props.duration,
    onStarted: () => emit('on-started'),
    onFinished: () => emit('on-finished'),
    ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {})
  });
}

function start() {
  run();
  source.value = props.endValue;
}

watch([() => props.startValue, () => props.endValue], () => {
  if (props.autoplay) {
    start();
  }
});

watchEffect(() => {
  source.value = props.startValue;
});

onMounted(() => {
  if (props.autoplay) {
    start();
  }
});
</script>

<template>
  <span>{{ value }}</span>
</template>
