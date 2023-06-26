<script setup lang="ts">
import img from '@/assets/images/example.png';
</script>

<template>
  <div class="p-24px">
    <RotateVerify :src="img"></RotateVerify>
  </div>
  <div class="p-24px">
    <RotateVerify clip-circle :src="img"></RotateVerify>
  </div>
</template>
