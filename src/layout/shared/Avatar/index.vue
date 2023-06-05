<script setup lang="ts">
import type { Component } from 'vue';
import avatar from '@/assets/images/avatar.png?url';

defineOptions({
  name: 'Avatar'
});

interface DropdownOption {
  key: string;
  command: string | number;
  text: string;
  disabled?: boolean;
  divided?: boolean;
  icon?: string | Component;
}

const options: DropdownOption[] = [
  {
    key: 'user-center',
    command: 1,
    text: '用户中心'
  },
  {
    key: 'change-password',
    command: 2,
    text: '修改密码'
  },
  {
    key: 'logout',
    command: 3,
    text: '退出登录'
  }
];

function handleCommand(command: string | number) {
  ElMessage.success(`Click on item ${command}`);
}
</script>

<template>
  <ElDropdown class="cursor-pointer" @command="handleCommand">
    <div class="flex justify-center items-center">
      <ElAvatar :size="32" :src="avatar"></ElAvatar>
      <span class="pl-8px text-16px font-medium dark:c-dark-info">喵喵教主</span>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="item in options"
          :key="item.key"
          :command="item.command"
          :disabled="item.disabled"
          :divided="item.divided"
          >{{ item.text }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
