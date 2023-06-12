import type { Ref, ComputedRef } from 'vue';
import * as echarts from 'echarts/core';
import type { ECharts, ComposeOption } from 'echarts/core';
import { BarChart, PieChart, LineChart } from 'echarts/charts';
import type { BarSeriesOption, PieSeriesOption, LineSeriesOption } from 'echarts/charts';
import { TitleComponent, LegendComponent, TooltipComponent, GridComponent } from 'echarts/components';
import type {
  TitleComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
  GridComponentOption
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useElementSize } from '@vueuse/core';
import { useThemeStore } from '@/stores';

export type ECOption = ComposeOption<
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | BarSeriesOption
  | PieSeriesOption
  | LineSeriesOption
>;

// 按需引入
echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart
]);

export function useECharts(options: Ref<ECOption> | ComputedRef<ECOption>, fn?: (instance: ECharts) => void) {
  const { isDark } = $(useThemeStore());
  const domRef = $ref<HTMLElement>();
  const initialSize = { width: 0, height: 0 };
  const { width, height } = $(useElementSize($$(domRef), initialSize));
  let chart: ECharts | null = null;
  const canRender = $(computed(() => width > 0 && height > 0));

  function isRendered() {
    return !!(domRef && chart);
  }

  function update(options: ECOption | Ref<ECOption> | ComputedRef<ECOption>) {
    if (isRendered()) {
      chart?.setOption({ ...unref(options), backgroundColor: 'transparent' });
    }
  }

  async function render() {
    if (domRef) {
      const theme = isDark ? 'dark' : 'light';
      await nextTick();
      chart = echarts.init(domRef, theme);
      if (fn) {
        fn(chart);
      }
      update(options);
    }
  }

  function resize() {
    chart?.resize();
  }

  function destroy() {
    chart?.dispose();
    chart = null;
  }

  function updateTheme() {
    destroy();
    render();
  }

  const stopSizeWatch = watch([$$(width), $$(height)], ([newWidth, newHeight]) => {
    initialSize.width = newWidth;
    initialSize.height = newHeight;
    if (newWidth === 0 && newHeight === 0) {
      destroy();
    }
    if (canRender) {
      if (!isRendered()) {
        render();
      } else {
        resize();
      }
    }
  });

  const stopOptionWatch = watch(options, (newVal) => update(newVal));

  const stopThemeWatch = watch(
    () => isDark,
    () => updateTheme()
  );

  onUnmounted(() => {
    stopSizeWatch();
    stopOptionWatch();
    stopThemeWatch();
    destroy();
  });

  return $$({
    domRef
  });
}
