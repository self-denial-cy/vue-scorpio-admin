<script setup lang="ts">
function msg() {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success'
  });
}
</script>

<template>
  <div>
    <ElButton @click="msg">123</ElButton>
  </div>
</template>
