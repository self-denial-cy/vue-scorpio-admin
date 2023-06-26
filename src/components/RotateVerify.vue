<script setup lang="ts">
import type { MoveData } from './DragVerify.vue';
import DragVerify from './DragVerify.vue';

defineOptions({
  name: 'RotateVerify'
});

interface Props {
  src: string;
  width?: number | string;
  height?: number | string;
  imgWidth?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imgWrapStyle?: any;
  minDegree?: number;
  maxDegree?: number;
  diffDegree?: number;
  clipCircle?: boolean;
  clipSize?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: 220,
  height: 40,
  imgWidth: 260,
  imgWrapStyle: {},
  minDegree: 90,
  maxDegree: 270,
  diffDegree: 10,
  clipCircle: false,
  clipSize: '35%'
});

export interface Result {
  passed: boolean;
  time: string;
}

interface Emits {
  (event: 'success', result: Result): void;
  (event: 'change', passed: boolean): void;
  (event: 'update:value', passed: boolean): void;
}

const emit = defineEmits<Emits>();
const attrs = useAttrs(); // 属性透传
const dragRef = ref<Helper.Nullable<Expose.DragVerify>>(null);

const state = reactive({
  showTip: false,
  passed: false,
  imgStyle: {},
  randomRotate: 0,
  currentRotate: 0,
  toOrigin: false,
  startTime: 0,
  endTime: 0,
  draged: false
});
const time = computed(() => (state.endTime - state.startTime) / 1000);

const getImgWrapStyle = computed(() => {
  let clipCircleStyle = {};
  if (props.clipCircle) {
    clipCircleStyle = {
      background: `url(${props.src}) no-repeat`,
      'background-size': '100% 100%'
    };
  }
  return {
    width: `${props.imgWidth}px`,
    height: `${props.imgWidth}px`,
    ...clipCircleStyle,
    ...props.imgWrapStyle
  };
});

function handleImgLoad() {
  const randomRotate = Math.floor(props.minDegree + Math.random() * (props.maxDegree - props.minDegree));
  state.randomRotate = randomRotate; // 图片初始化生成随机旋转角度
  state.imgStyle = { transform: `rotateZ(${randomRotate}deg)` };
}

function resume() {
  state.showTip = false;
  state.passed = false;
  handleImgLoad();
  if (!dragRef.value) return;
  dragRef.value.resume();
}

function handleDragStart() {
  state.startTime = Date.now();
}

const getFactor = computed(() => {
  if (props.minDegree === props.maxDegree) {
    return Math.floor(1 + Math.random()) / 10 + 1;
  }
  return 1;
});

function handleDragMove({ moveX }: MoveData) {
  state.draged = true;
  const currentRotate = Math.ceil(
    (moveX / (props.imgWidth - parseInt(props.height as string))) * props.maxDegree * getFactor.value
  );
  state.currentRotate = currentRotate;
  state.imgStyle = { transform: `rotateZ(${state.randomRotate - currentRotate}deg)` };
}

function handleDragEnd() {
  if (Math.abs(state.randomRotate - state.currentRotate) >= props.diffDegree) {
    state.imgStyle = { transform: `rotateZ(${state.randomRotate}deg)` }; // 还原到初始角度
    state.toOrigin = true; // 开启动画
    setTimeout(() => {
      state.toOrigin = false;
      state.showTip = true;
    }, 300); // timeout 与动画持续时长一致
  } else {
    state.passed = true;
    state.endTime = Date.now();
    state.showTip = true;
  }
}

watch(
  () => state.passed,
  (newVal) => {
    if (newVal) {
      emit('success', { passed: newVal, time: time.value.toFixed(1) });
      emit('change', newVal);
      emit('update:value', newVal);
    }
  }
);
</script>

<template>
  <div class="r-verify">
    <div class="r-verify-img__wrap" :style="getImgWrapStyle">
      <img
        :src="props.src"
        alt="verify"
        :class="{ 'to-origin': state.toOrigin }"
        :width="parseInt(props.width as string)"
        :style="{ ...state.imgStyle, clipPath: props.clipCircle ? `circle(${props.clipSize} at center)` : '' }"
        @click="resume"
        @load="handleImgLoad"
      />
      <span v-if="state.showTip" :class="['r-verify-img__tip', state.passed ? 'success' : 'error']">{{
        state.passed ? `验证成功，耗时${time.toFixed(1)}秒` : '验证失败'
      }}</span>
      <span v-if="!state.draged" class="r-verify-img__tip normal">点击图片可刷新</span>
    </div>
    <DragVerify
      ref="dragRef"
      class="r-verify-drag__bar"
      :value="state.passed"
      is-slot
      v-bind="attrs"
      @start="handleDragStart"
      @move="handleDragMove"
      @end="handleDragEnd"
    ></DragVerify>
  </div>
</template>

<style lang="less" scoped>
.r-verify {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  &-img__wrap {
    overflow: hidden;
    position: relative;
    border-radius: 50%;
    img {
      border-radius: 50%;
      width: 100%;
      &.to-origin {
        transition: transform 0.3s;
      }
    }
  }
  &-img__tip {
    display: block;
    position: absolute;
    left: 0;
    bottom: 10px;
    z-index: 1;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    &.success {
      background-color: fade(#67c23a, 60%);
    }
    &.error {
      background-color: fade(#f56c6c, 60%);
    }
    &.normal {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  &-drag__bar {
    margin-top: 16px;
  }
}
</style>
