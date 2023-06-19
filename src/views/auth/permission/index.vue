<script setup lang="ts">
import { useReloadStore, useAuthStore } from '@/stores';
import { Role } from '@/enum';

defineOptions({
  name: 'permission'
});

const { reload } = useReloadStore();
const { userInfo, setUserRole } = useAuthStore();

function changeRole() {
  const roles: RoleType[] = ['super', 'admin', 'user'];
  const role = roles[(roles.indexOf(userInfo.role) + 1) % roles.length];
  setUserRole(role);
  reload();
}

function getRoleName(role: RoleType) {
  return Role[role];
}
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">在此变更角色权限以查看权限指令的效果，权限变更同时会影响侧边栏菜单</span>
      </template>
      <div class="text-16px mb-12px">当前角色【{{ getRoleName(userInfo.role) }}】</div>
      <ElButton type="primary" plain @click="changeRole">
        <span>变更角色权限</span>
        <template #icon>
          <ElIcon class="w-16px! h-16px!">
            <i-mdi-nintendo-switch class="text-16px"></i-mdi-nintendo-switch>
          </ElIcon>
        </template>
      </ElButton>
      <div class="mt-16px flex gap-8px">
        <ElButton type="success" plain>普通用户可见</ElButton>
        <ElButton v-permission="['admin', 'super']" type="warning" plain>管理员可见</ElButton>
        <ElButton v-permission="['super']" type="danger" plain>超级管理员可见</ElButton>
      </div>
    </ElCard>
  </div>
</template>
