<script setup lang="ts">
const charArr = [
  '鸡',
  '你',
  '太',
  '美',
  '练',
  '习',
  '两',
  '年',
  '半',
  '唱',
  '跳',
  'r',
  'a',
  'p',
  '篮',
  '球',
  '哎',
  '哟',
  '你',
  '干',
  '嘛'
];

let code = ref('鸡你太美');

function refresh() {
  code.value = [...charArr]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .join('');
}
</script>

<template>
  <div class="p-24px">
    <RandomCodeVerify></RandomCodeVerify>
  </div>
  <div class="p-24px">
    <RandomCodeVerify
      class="cursor-pointer"
      :identify-code="code"
      :width="220"
      :height="56"
      :font-size-range="[32, 48]"
      @click="refresh"
    ></RandomCodeVerify>
  </div>
</template>
