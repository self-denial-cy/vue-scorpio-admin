<script setup lang="ts">
defineOptions({
  name: 'SiteLink'
});

interface Props {
  label: string; // 站点名称
  href: string; // 站点链接
}

defineProps<Props>();
</script>

<template>
  <div class="inline-block flex items-center">
    <span class="text-16px mr-8px">{{ label }}</span>
    <ElLink type="primary" :href="href" target="_blank">
      <template #default>
        <span class="text-16px mr-4px">{{ href }}</span>
      </template>
      <template #icon>
        <ElIcon class="w-16px! h-16px!">
          <i-ep-link class="text-16px"></i-ep-link>
        </ElIcon>
      </template>
    </ElLink>
  </div>
</template>
