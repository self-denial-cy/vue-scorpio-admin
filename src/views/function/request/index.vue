<script setup lang="ts">
import { createService } from '@/service';

const service = createService({ baseURL: '/mock' });

async function fetch501() {
  console.log(await service.get('/api/example/501'));
}

async function fetchFailed() {
  console.log(await service.post('/api/example/logic/error'));
}

async function fetchSucceed() {
  console.log(await service.post('/api/example/logic/success'));
}
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">网络请求【请打开控制台查看】</span>
      </template>
      <ElTooltip content="该请求 HTTP 状态码 501">
        <ElButton type="danger" plain size="large" @click="fetch501">请求 501</ElButton>
      </ElTooltip>
      <ElTooltip content="该请求 HTTP 成功，但是业务码失败">
        <ElButton type="warning" plain size="large" @click="fetchFailed">业务失败</ElButton>
      </ElTooltip>
      <ElTooltip content="该请求 HTTP 成功，业务码成功">
        <ElButton type="success" plain size="large" @click="fetchSucceed">业务成功</ElButton>
      </ElTooltip>
    </ElCard>
  </div>
</template>
