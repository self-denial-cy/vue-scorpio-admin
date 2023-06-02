<script setup lang="ts">
defineOptions({
  name: 'Exception'
});

interface Props {
  type: '403' | '404' | '500';
}

defineProps<Props>();

const router = useRouter();

function back() {
  router.back();
}
</script>

<template>
  <div class="w-full h-full flex justify-center items-center flex-col">
    <ElIcon v-if="type === '403'" class="w-400px! h-400px!"><i-l-403 class="text-400px"></i-l-403></ElIcon>
    <ElIcon v-if="type === '404'" class="w-400px! h-400px!"><i-l-404 class="text-400px"></i-l-404></ElIcon>
    <ElIcon v-if="type === '500'" class="w-400px! h-400px!"><i-l-500 class="text-400px"></i-l-500></ElIcon>
    <ElButton type="primary" @click="back">返回上一页</ElButton>
  </div>
</template>
