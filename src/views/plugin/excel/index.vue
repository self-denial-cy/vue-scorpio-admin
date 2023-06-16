<script setup lang="ts">
import type { ExcelData } from '@/composables';
import canvasDatagrid from 'canvas-datagrid';
// import Handsontable from 'handsontable';
// import 'handsontable/dist/handsontable.full.min.css';

defineOptions({
  name: 'excel'
});

function handleSuccess(data: ExcelData[]) {
  ElMessage.success('Excel 导入成功');
  renderTable(data);
  renderCanvasDatagrid(data);
  // renderHandsontable(data);
}

function handleCancel() {
  ElMessage.warning('已取消 Excel 导入');
}

function handleError() {
  ElMessage.error('啊哦，报错了~');
}

let tableDatas = $ref<ExcelData[]>([]);

function renderTable(data: ExcelData[]) {
  tableDatas = data;
}

const gridRefs = $ref<HTMLDivElement[] | []>([]);
let gridItems = $ref<unknown[]>([]);

async function renderCanvasDatagrid(data: ExcelData[]) {
  gridItems = data.map((_) => _.result);
  await nextTick();
  for (let i = 0; i < gridRefs.length; i++) {
    const grid = canvasDatagrid({
      parentNode: gridRefs[i],
      data: gridItems[i] as unknown[]
    });
    // @ts-expect-error canvas-datagrid 类型声明文件不全，有坑
    grid.style.width = '100%';
  }
}

// const hotRefs = $ref<HTMLDivElement[] | []>([]);
// type HotItemType = {
//   header: string[];
//   data: Array<Array<unknown>>;
// };
// let hotItems = $ref<HotItemType[]>([]);

// async function renderHandsontable(data: ExcelData[]) {
//   hotItems = data.map((_) => ({ header: _.header, data: _.data }));
//   await nextTick();
//   for (let i = 0; i < hotRefs.length; i++) {
//     new Handsontable(hotRefs[i], {
//       data: [hotItems[i].header, ...hotItems[i].data],
//       rowHeaders: true,
//       colHeaders: true,
//       licenseKey: 'non-commercial-and-evaluation',
//       height: 'auto'
//     });
//   }
// }
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <span class="text-18px">Excel 导入</span>
      </template>
      <ElSpace direction="vertical" alignment="normal">
        <SiteLink label="Github" href="https://github.com/SheetJS/sheetjs"></SiteLink>
        <SiteLink label="示例文件" href="/example.xlsx" text="点击下载" self></SiteLink>
      </ElSpace>
      <div class="mt-16px">
        <ImportExcel @success="handleSuccess" @cancel="handleCancel" @error="handleError">
          <ElButton type="primary" plain>
            <span>Excel 导入</span>
            <template #icon>
              <ElIcon class="w-16px! h-16px!">
                <i-mdi-microsoft-excel class="text-16px"></i-mdi-microsoft-excel>
              </ElIcon>
            </template>
          </ElButton>
        </ImportExcel>
      </div>
      <ElTable
        v-for="(item, index) in tableDatas"
        :key="index"
        class="mt-24px"
        :data="item.result"
        stripe
        highlight-current-row
        :max-height="300"
      >
        <ElTableColumn v-for="(v, i) in item.header" :key="i" :prop="v" :label="v"></ElTableColumn>
      </ElTable>
      <div v-for="i in gridItems.length" :key="i" ref="gridRefs" class="mt-24px"></div>
      <!-- <div v-for="i in hotItems.length" :key="i" ref="hotRefs" class="mt-24px"></div> -->
    </ElCard>
  </div>
</template>
