<script setup lang="ts">
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';

const domRef = $ref<HTMLDivElement | null>(null);
let player = $ref<Player | null>(null);

function renderPlayer() {
  if (!domRef) return;
  player = new Player({
    el: domRef,
    url: 'https://www.w3schools.com/html/movie.mp4',
    cssFullscreen: false
  });
}

onMounted(() => {
  renderPlayer();
});

onUnmounted(() => {
  player?.destroy();
});
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">视频</span>
      </template>
      <SiteLink label="Github" href="https://github.com/bytedance/xgplayer"></SiteLink>
      <div ref="domRef" class="mt-24px"></div>
    </ElCard>
  </div>
</template>
