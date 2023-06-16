<script setup lang="ts">
defineOptions({
  name: 'SiteLink'
});

interface Props {
  label: string; // 站点名称
  href: string; // 站点链接
  text?: string;
  self?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="inline-block flex items-center">
    <span class="text-16px mr-8px">{{ label }}</span>
    <ElLink type="primary" :href="href" :target="self ? '_self' : '_blank'">
      <template #default>
        <span class="text-16px mr-4px">{{ text ? text : href }}</span>
      </template>
      <template #icon>
        <ElIcon class="w-16px! h-16px!">
          <i-ep-link class="text-16px"></i-ep-link>
        </ElIcon>
      </template>
    </ElLink>
  </div>
</template>
