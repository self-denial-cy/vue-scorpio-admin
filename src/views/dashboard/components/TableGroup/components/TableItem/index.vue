<script setup lang="ts">
defineOptions({
  name: 'TableItem'
});

interface TableData {
  image: string;
  code: string;
  title: string;
  date: string;
  state: 'success' | 'info' | 'warning' | 'danger' | '';
  id: string;
}

const tableData: TableData[] = $ref([
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'success',
    id: '#7234486'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'info',
    id: '#7234486'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'warning',
    id: '#7234486'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'danger',
    id: '#7234486'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: '',
    id: '#7234486'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'success',
    id: '#7234486'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'success',
    id: '#7234486'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'danger',
    id: '#7234486'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'danger',
    id: '#7234486'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'danger',
    id: '#7234486'
  }
]);

function loadMore() {
  tableData.push({
    image: 'https://avatars.githubusercontent.com/u/87003751?v=4&size=36',
    code: 'PNG002344',
    title: 'John Deo',
    date: '2023-06-10',
    state: 'warning',
    id: '#7234486'
  });
}
</script>

<template>
  <ElTable :data="tableData" stripe highlight-current-row max-height="450">
    <ElTableColumn prop="image" label="Image">
      <template #default="{ row }">
        <div class="flex items-center">
          <ElImage :src="row.image"></ElImage>
        </div>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="code" label="Code"></ElTableColumn>
    <ElTableColumn prop="title" label="Title"></ElTableColumn>
    <ElTableColumn prop="date" label="Date"></ElTableColumn>
    <ElTableColumn prop="state" label="State">
      <template #default="{ row }">
        <ElTag :type="row.state" effect="dark">
          <span class="inline-block min-w-40px text-center">{{ row.state || 'default' }}</span>
        </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="id" label="Id"></ElTableColumn>
  </ElTable>
  <div class="my-16px text-center">
    <ElButton type="primary" plain round @click="loadMore">Load More</ElButton>
  </div>
</template>
