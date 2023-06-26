<script setup lang="ts">
import { useEventListener } from '@vueuse/core';

defineOptions({
  name: 'DragVerify'
});

export interface Result {
  passed: boolean;
  time: string;
}

interface Props {
  value?: boolean;
  isSlot?: boolean;
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapperStyle?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  barStyle?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentStyle?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionStyle?: any;
  text?: string;
  successText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: false,
  isSlot: false,
  width: 220,
  height: 40,
  circle: false,
  wrapperStyle: {},
  barStyle: {},
  contentStyle: {},
  actionStyle: {},
  text: '请按住滑块拖动',
  successText: '验证通过'
});

export interface MoveData {
  event: MouseEvent | TouchEvent;
  moveDistance: number;
  moveX: number;
}

interface Emits {
  (event: 'success', result: Result): void;
  (event: 'update:value', passed: boolean): void;
  (event: 'change', passed: boolean): void;
  (event: 'start', evt: MouseEvent | TouchEvent): void;
  (event: 'move', data: MoveData): void;
  (event: 'end', evt: MouseEvent | TouchEvent): void;
}

const emit = defineEmits<Emits>();

const wrapperRef = ref<HTMLDivElement | null>(null);
const getWrapperStyle = computed(() => {
  const w = parseInt(props.width as string);
  const h = parseInt(props.height as string);
  return {
    width: `${w}px`,
    height: `${h}px`,
    lineHeight: `${h}px`,
    borderRadius: props.circle ? `${h / 2}px` : null,
    ...props.wrapperStyle
  };
});

const barRef = ref<HTMLDivElement | null>(null);
const getBarStyle = computed(() => {
  const h = parseInt(props.height as string);
  return {
    height: `${h}px`,
    borderRadius: props.circle ? `${h / 2}px 0 0 ${h / 2}px` : null,
    ...props.barStyle
  };
});

const contentRef = ref<HTMLDivElement | null>(null);
const getContentStyle = computed(() => {
  const w = parseInt(props.width as string);
  const h = parseInt(props.height as string);
  return {
    width: `${w}px`,
    height: `${h}px`,
    ...props.contentStyle
  };
});

const actionRef = ref<HTMLDivElement | null>(null);
const getActionStyle = computed(() => {
  const h = parseInt(props.height as string);
  let left: number | string = 0;
  if (barRef.value && actionRef.value && state.passed) {
    const { width, actionWidth } = getOffset(actionRef.value);
    if (!props.isSlot) {
      left = `${width - actionWidth}px`;
    } else {
      const barWidth = parseInt(barRef.value.style.width as string);
      left = `${barWidth - actionWidth / 2}px`;
    }
  }
  return {
    left,
    width: `${h}px`,
    height: `${h}px`,
    ...props.actionStyle
  };
});

const state = reactive({
  isMoving: false,
  passed: false,
  moveDistance: 0,
  toLeft: false,
  startTime: 0,
  endTime: 0
});

function getOffset(el: HTMLDivElement) {
  const actionWidth = parseInt(el.style.width);
  const width = parseInt(props.width as string);
  const offset = width - actionWidth - 5; // 留 5px 的空间锁定验证成功
  return { offset, width, actionWidth };
}

function handleDragMove(evt: MouseEvent | TouchEvent) {
  if (state.isMoving) {
    if (!actionRef.value || !barRef.value) return;
    const { offset, width, actionWidth } = getOffset(actionRef.value);
    const moveX = getPageX(evt) - state.moveDistance;
    emit('move', { event: evt, moveDistance: state.moveDistance, moveX });
    if (moveX > 0 && moveX <= offset) {
      actionRef.value.style.left = `${moveX}px`;
      barRef.value.style.width = `${moveX + actionWidth / 2}px`;
    } else if (moveX > offset) {
      actionRef.value.style.left = `${width - actionWidth}px`;
      barRef.value.style.width = `${width - actionWidth / 2}px`;
      if (!props.isSlot) {
        checkPassed();
      }
    }
  }
}

function checkPassed() {
  state.endTime = Date.now();
  state.passed = true;
  state.isMoving = false;
}

function handleDragOver(evt: MouseEvent | TouchEvent) {
  if (state.isMoving && !state.passed) {
    if (!actionRef.value || !barRef.value) return;
    const { offset, width, actionWidth } = getOffset(actionRef.value);
    const moveX = getPageX(evt) - state.moveDistance;
    emit('end', evt);
    if (moveX < offset) {
      if (!props.isSlot) {
        resume();
      } else {
        nextTick(() => {
          if (!props.value) {
            resume();
          } else {
            if (contentRef.value && barRef.value) {
              contentRef.value.style.width = `${parseInt(barRef.value.style.width as string)}px`;
            }
            state.isMoving = false;
          }
        });
      }
    } else {
      actionRef.value.style.left = `${width - actionWidth}px`;
      barRef.value.style.width = `${width - actionWidth / 2}px`;
      if (!props.isSlot) {
        checkPassed();
      } else {
        resume();
      }
    }
  }
}

function resume() {
  state.isMoving = false;
  state.passed = false;
  state.moveDistance = 0;
  state.toLeft = false;
  state.startTime = 0;
  state.endTime = 0;
  if (!wrapperRef.value || !barRef.value || !actionRef.value) return;
  state.toLeft = true; // 还原动画
  setTimeout(() => {
    state.toLeft = false;
    if (actionRef.value) actionRef.value.style.left = '0';
    if (barRef.value) barRef.value.style.width = '0';
  }, 300); // timeout 与动画持续时长一致
  if (contentRef.value) contentRef.value.style.width = getContentStyle.value.width;
}

function getPageX(evt: MouseEvent | TouchEvent) {
  return (evt as MouseEvent).pageX || (evt as TouchEvent).touches[0].pageX;
}

function handleDragStart(evt: MouseEvent | TouchEvent) {
  if (state.passed) return;
  if (!actionRef.value) return;
  emit('start', evt);
  state.moveDistance = getPageX(evt) - parseInt(actionRef.value.style.left);
  state.startTime = Date.now();
  state.isMoving = true;
}

watch(
  () => state.passed,
  (newVal) => {
    if (newVal) {
      const { startTime, endTime } = state;
      const time = (endTime - startTime) / 1000;
      emit('success', { passed: newVal, time: time.toFixed(1) });
      emit('update:value', newVal);
      emit('change', newVal);
    }
  }
);

watchEffect(() => {
  state.passed = !!props.value;
});

useEventListener(document, 'mouseup', () => {
  if (state.isMoving) {
    resume();
  }
});

defineExpose({
  resume
});
</script>

<template>
  <div
    ref="wrapperRef"
    class="drag-verify"
    :style="getWrapperStyle"
    @mousemove="handleDragMove"
    @touchmove="handleDragMove"
    @mouseleave="handleDragOver"
    @mouseup="handleDragOver"
    @touchend="handleDragOver"
  >
    <div ref="barRef" class="drag-verify-bar" :class="{ 'to-left': state.toLeft }" :style="getBarStyle"></div>
    <div ref="contentRef" class="drag-verify-content" :class="{ success: state.passed }" :style="getContentStyle">
      <slot :passed="state.passed" name="content">
        <span>{{ state.passed ? props.successText : props.text }}</span>
      </slot>
    </div>
    <div
      ref="actionRef"
      class="drag-verify-action"
      :class="{ 'to-left': state.toLeft }"
      :style="getActionStyle"
      @mousedown="handleDragStart"
      @touchstart="handleDragStart"
    >
      <slot :passed="state.passed" name="action">
        <ElIcon v-if="state.passed">
          <i-ep-check class="drag-verify-action__icon dark:c-dark"></i-ep-check>
        </ElIcon>
        <ElIcon v-else>
          <i-ep-d-arrow-right class="drag-verify-action__icon dark:c-dark"></i-ep-d-arrow-right>
        </ElIcon>
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.drag-verify {
  overflow: hidden;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #eee;
  text-align: center;
  &-bar {
    position: absolute;
    border-radius: 4px;
    width: 0;
    background-color: #67c23a;
    &.to-left {
      width: 0 !important;
      transition: width 0.3s;
    }
  }
  &-content {
    position: absolute;
    top: 0;
    user-select: none;
    text-size-adjust: none;
    font-size: 12px;
    &.success > * {
      color: #fff;
    }
    & > * {
      color: #333;
    }
  }
  &-action {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    &__icon {
      cursor: inherit;
    }
    &.to-left {
      left: 0 !important;
      transition: left 0.3s;
    }
  }
}
</style>
