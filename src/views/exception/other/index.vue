<template>
  <div>
    <DarkModeContainer class="flex flex-wrap justify-around p-16px">
      <div class="flex flex-col justify-center items-center">
        <ElIcon class="w-300px! h-300px!"><i-l-load-failed class="text-300px"></i-l-load-failed></ElIcon>
        <span class="text-16px">加载失败</span>
      </div>
      <div class="flex flex-col justify-center items-center">
        <ElIcon class="w-300px! h-300px!"><i-l-network-error class="text-300px"></i-l-network-error></ElIcon>
        <span class="text-16px">网络不给力</span>
      </div>
      <div class="flex flex-col justify-center items-center">
        <ElIcon class="w-300px! h-300px!"><i-l-no-content class="text-300px"></i-l-no-content></ElIcon>
        <span class="text-16px">暂无数据</span>
      </div>
      <div class="flex flex-col justify-center items-center">
        <ElIcon class="w-300px! h-300px!"><i-l-no-message class="text-300px"></i-l-no-message></ElIcon>
        <span class="text-16px">暂无消息</span>
      </div>
      <div class="flex flex-col justify-center items-center">
        <ElIcon class="w-300px! h-300px!"><i-l-page-error class="text-300px"></i-l-page-error></ElIcon>
        <span class="text-16px">页面出错</span>
      </div>
    </DarkModeContainer>
  </div>
</template>
