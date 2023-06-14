<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { useThemeStore } from '@/stores';

defineOptions({
  name: 'GaodeMap'
});

window._AMapSecurityConfig = {
  securityJsCode: import.meta.env.VITE_APP_GAODE_SECURITY_CODE
};

const MapStyle = ['amap://styles/normal', 'amap://styles/blue'];

const { isDark } = $(useThemeStore());

const domRef = $ref<HTMLDivElement>();

let map: AMap.Map | null = null;

async function renderMap() {
  if (!domRef) return;
  const {
    Map,
    TileLayer,
    Scale,
    HawkEye,
    ToolBar,
    ControlBar,
    PlaceSearch
  }: // Driving
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof AMap & { Scale: any; HawkEye: any; ToolBar: any; ControlBar: any; PlaceSearch: any; Driving: any } =
    await AMapLoader.load({
      key: import.meta.env.VITE_APP_GAODE_SDK_KEY,
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.HawkEye', 'AMap.ToolBar', 'AMap.ControlBar', 'AMap.PlaceSearch', 'AMap.Driving']
    });
  map = new Map(domRef, {
    zoom: 11,
    viewMode: '2D',
    mapStyle: isDark ? MapStyle[1] : MapStyle[0],
    center: [120.733907, 31.264148]
  });
  // 实时交通路况图层
  const traffic = new TileLayer.Traffic({
    autoRefresh: true,
    interval: 180
  });
  map.add(traffic);
  // 引入插件功能【缩放工具条、比例尺、鹰眼、方向盘】
  const scale = new Scale({
    visible: true
  });
  const hawkeye = new HawkEye({
    visible: true
  });
  const toolbar = new ToolBar({
    visible: true,
    position: {
      top: '110px',
      right: '40px'
    }
  });
  const controlbar = new ControlBar({
    visible: true,
    position: {
      top: '10px',
      right: '10px'
    }
  });
  map.addControl(scale);
  map.addControl(hawkeye);
  map.addControl(toolbar);
  map.addControl(controlbar);
  // 地点搜索插件
  const placeSearch = new PlaceSearch({
    pageSize: 5, // 单页显示结果条数
    pageIndex: 1, // 页码
    city: '苏州', // 兴趣点城市，可以设置城市编码
    citylimit: true, // 是否强制限制在设置的城市内搜索
    map: map, // 展现结果的地图实例
    panel: 'panel', // 结果列表将在此容器中进行展示
    autoFitView: true // 是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
  });
  placeSearch.search('烧烤');
  // 驾车路线规划插件
  // const points = [
  //   { keyword: '苏州站', city: '苏州' },
  //   { keyword: '苏州北站', city: '苏州' }
  // ];
  // const driving = new Driving({
  //   map: map,
  //   panel: 'panel'
  // });
  // driving.search(points);
}

function setMapStyle(map: AMap.Map | null, isDark: boolean) {
  if (!map) return;
  if (isDark) {
    map.setMapStyle(MapStyle[1]);
  } else {
    map.setMapStyle(MapStyle[0]);
  }
}

watch($$(isDark), (newVal) => setMapStyle(map, newVal));

onMounted(() => {
  renderMap();
});
</script>

<template>
  <div ref="domRef" class="h-full gaode"></div>
  <div id="panel" class="absolute top-0"></div>
</template>

<style lang="less" scoped>
.gaode {
  :deep(.amap-controls) {
    position: static;
  }
}
</style>
