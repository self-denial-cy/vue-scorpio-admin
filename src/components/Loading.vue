<script setup lang="ts">
import loadingJSON from '@/assets/animations/loading.json';

defineOptions({
  name: 'Loading'
});
</script>

<template>
  <div class="w-100vh h-100vh flex justify-center items-center">
    <Lottie :animation-data="loadingJSON" :width="250" :height="250"></Lottie>
  </div>
</template>
