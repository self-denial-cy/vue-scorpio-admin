<script setup lang="ts">
defineOptions({
  name: 'icon'
});
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">图标使用示例</span>
      </template>
      <ElSpace direction="vertical" alignment="normal">
        <div>
          <h3 class="text-18px">iconify element 图标集【可自定义样式】</h3>
          <ElIcon class="w-20px! h-20px!" color="#2d8cf0">
            <i-ep-apple class="text-20px"></i-ep-apple>
          </ElIcon>
        </div>
        <div>
          <h3 class="text-18px">iconify mdi 图标集【可自定义样式】</h3>
          <ElIcon class="w-20px! h-20px!" color="#2d8cf0">
            <i-mdi-github class="text-20px"></i-mdi-github>
          </ElIcon>
        </div>
        <div>
          <h3 class="text-18px">本地图标</h3>
          <ElIcon class="w-20px! h-20px!">
            <i-l-logo class="text-20px"></i-l-logo>
          </ElIcon>
        </div>
        <div>
          <h3 class="text-18px">iconify 图标【动态渲染、可自定义样式】</h3>
          <ElIcon class="w-20px! h-20px!" color="#2d8cf0">
            <Icon icon="ep:apple" class="text-20px"></Icon>
          </ElIcon>
        </div>
        <div>
          <h3 class="text-18px">雪碧图</h3>
          <SvgIcon name="logo" :width="20" :height="20"></SvgIcon>
        </div>
      </ElSpace>
    </ElCard>
  </div>
</template>
