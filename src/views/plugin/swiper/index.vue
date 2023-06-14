<script setup lang="ts">
import { register } from 'swiper/element';
import type { SwiperOptions } from 'swiper';

register();

defineOptions({
  name: 'swiper'
});

interface SwiperItem {
  id: number;
  label: string;
  options: Partial<SwiperOptions>;
}

const swipers: SwiperItem[] = [
  {
    id: 1,
    label: 'Default',
    options: {}
  },
  {
    id: 2,
    label: 'Navigation',
    options: {
      navigation: true
    }
  }
];
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">Swiper web components</span>
      </template>
      <ElSpace direction="vertical" alignment="normal">
        <SiteLink label="Github" href="https://github.com/nolimits4web/swiper"></SiteLink>
        <SiteLink label="Swiper Element (WebComponent)" href="https://swiperjs.com/element"></SiteLink>
      </ElSpace>
      <ElSpace direction="vertical" alignment="normal" class="w-full">
        <div v-for="item in swipers" :key="item.id">
          <div class="py-12px text-16px font-bold">{{ item.label }}</div>
          <swiper-container v-bind="item.options">
            <swiper-slide v-for="i in 5" :key="i" class="w-full!">
              <div class="flex justify-center items-center h-240px border-solid border-2px text-16px font-bold">
                Slide{{ i }}
              </div>
            </swiper-slide>
          </swiper-container>
        </div>
      </ElSpace>
    </ElCard>
  </div>
</template>
