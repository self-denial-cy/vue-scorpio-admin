<script setup lang="ts">
import type { FormRules } from 'element-plus';

const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}));

const form = reactive({
  name: '',
  zone: '',
  count: ''
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { max: 12, message: '名称长度不得超过12个字符', trigger: 'blur' }
  ],
  zone: [
    { required: true, message: '请选择区域', trigger: 'change' },
    { type: 'enum', enum: ['suzhou'], message: '请选择苏州', trigger: 'change' }
  ],
  count: [{ required: true, message: '请选择数值', trigger: 'change' }]
});
</script>

<template>
  <div>
    <ElCard shadow="hover">
      <template #header>
        <span class="text-16px">基础表单规则校验</span>
      </template>
      <ElForm :model="form" :rules="rules" :label-width="120" status-icon>
        <ElFormItem label="名称" prop="name">
          <ElInput v-model="form.name" placeholder="请输入名称" clearable></ElInput>
        </ElFormItem>
        <ElFormItem label="区域" prop="zone">
          <ElSelect v-model="form.zone" clearable placeholder="请选择区域">
            <ElOption label="上海" value="shanghai"></ElOption>
            <ElOption label="苏州" value="suzhou"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="数值" prop="count">
          <ElSelectV2 v-model="form.count" placeholder="请选择数值" :options="options"></ElSelectV2>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>
