<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { SwiperOptions } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

defineOptions({
  name: 'swiper'
});

interface SwiperItem {
  id: number;
  label: string;
  options: Partial<Pick<SwiperOptions, 'navigation' | 'modules' | 'pagination' | 'loop' | 'autoplay'>>;
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
      navigation: true,
      modules: [Navigation]
    }
  },
  {
    id: 3,
    label: 'Pagination',
    options: {
      pagination: true,
      modules: [Pagination]
    }
  },
  {
    id: 4,
    label: 'Pagination dynamicBullets',
    options: {
      pagination: {
        dynamicBullets: true
      },
      modules: [Pagination]
    }
  },
  {
    id: 5,
    label: 'Pagination progressbar',
    options: {
      navigation: true,
      pagination: {
        type: 'progressbar'
      },
      modules: [Navigation, Pagination]
    }
  },
  {
    id: 6,
    label: 'Infinite loop',
    options: {
      navigation: true,
      pagination: {
        clickable: true
      },
      modules: [Pagination, Navigation],
      loop: true
    }
  },
  {
    id: 7,
    label: 'Autoplay loop',
    options: {
      modules: [Autoplay],
      autoplay: {
        delay: 1500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      },
      loop: true
    }
  }
];
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">Swiper</span>
      </template>
      <ElSpace direction="vertical" alignment="normal">
        <SiteLink label="Github" href="https://github.com/nolimits4web/swiper"></SiteLink>
        <SiteLink label="Swiper Vue.js Components" href="https://swiperjs.com/vue"></SiteLink>
      </ElSpace>
      <ElSpace direction="vertical" alignment="normal" class="w-full">
        <div v-for="item in swipers" :key="item.id">
          <div class="py-12px text-16px font-bold">{{ item.label }}</div>
          <Swiper v-bind="item.options">
            <SwiperSlide v-for="i in 5" :key="i" class="w-full!">
              <div class="flex justify-center items-center h-240px border-solid border-2px text-16px font-bold">
                Slide{{ i }}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </ElSpace>
    </ElCard>
  </div>
</template>
