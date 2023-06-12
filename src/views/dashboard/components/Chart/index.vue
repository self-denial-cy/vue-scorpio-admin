<script setup lang="ts">
import { useECharts } from '@/composables';
import type { ECOption } from '@/composables';

defineOptions({
  name: 'Chart'
});

const lineOptions = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['下载量', '注册数']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      color: '#8e9dff',
      name: '下载量',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#8e9dff'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311]
    },
    {
      color: '#26deca',
      name: '注册数',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#26deca'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678]
    }
  ]
});

const { domRef: lineRef } = useECharts(lineOptions);

const pieOptions = ref<ECOption>({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '1%',
    left: 'center',
    itemStyle: {
      borderWidth: 0
    }
  },
  series: [
    {
      color: ['#3e9aff', '#82c2fd'],
      name: 'Sales proportion',
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '28'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 565, name: 'cosmetics' },
        { value: 89, name: 'computer' }
      ]
    }
  ]
});

const { domRef: pieRef } = useECharts(pieOptions);
</script>

<template>
  <ElRow :gutter="16">
    <ElCol :span="16" :xs="24">
      <ElCard header="Statistics" class="custom-card">
        <div ref="lineRef" class="h-360px"></div>
      </ElCard>
    </ElCol>
    <ElCol :span="8" :xs="24">
      <ElCard header="Customer Feedback" class="custom-card">
        <div ref="pieRef" class="h-360px"></div>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<style lang="less" scoped>
.custom-card {
  :deep(.el-card__body) {
    padding-top: 0;
  }
  :deep(.el-card__header) {
    border-bottom: none;
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
