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
    <el-icon size="24" color="#ff0"><i-m-add></i-m-add></el-icon>
    <el-icon size="24"><i-l-dinosaur></i-l-dinosaur></el-icon>
  </div>
</template>
