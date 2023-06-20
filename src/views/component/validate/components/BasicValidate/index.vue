<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus';

const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}));

const form = reactive({
  name: '',
  zone: '',
  count: '',
  startDate: '',
  endDate: '',
  switch: false,
  fruits: [],
  course: '',
  remark: '',
  obj: ''
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
  count: [{ required: true, message: '请选择数值', trigger: 'change' }],
  startDate: [{ type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }],
  endDate: [{ type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }],
  fruits: [
    {
      type: 'array',
      required: true,
      defaultField: { type: 'enum', enum: ['apple', 'orange'], message: '请选择苹果或橘子' },
      message: '请选择水果',
      trigger: 'change'
    }
  ],
  course: [{ required: true, message: '请选择课程', trigger: 'change' }],
  remark: [
    { required: true, message: '请输入备注', trigger: 'blur' },
    {
      type: 'string',
      pattern: /^[a-zA-Z]+$/,
      transform(value) {
        return value.trim();
      },
      message: '只允许输入字母',
      trigger: 'blur'
    }
  ],
  obj: [
    {
      type: 'object',
      fields: { title: { required: true } },
      transform(value) {
        return JSON.parse(value);
      }
    }
  ]
});

const formRef = ref<FormInstance | null>(null);

function submitForm(formRef: FormInstance | null) {
  if (!formRef) return;
  formRef.validate((isValid, invalidFields) => {
    if (!isValid) {
      console.log(invalidFields);
    }
  });
}

function resetForm(formRef: FormInstance | null) {
  if (!formRef) return;
  formRef.resetFields();
}
</script>

<template>
  <div>
    <ElCard shadow="hover">
      <template #header>
        <span class="text-16px">基础表单规则校验</span>
      </template>
      <ElForm ref="formRef" :model="form" :rules="rules" :label-width="120" status-icon>
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
        <ElFormItem label="时间范围" required>
          <div class="flex gap-10px">
            <ElFormItem prop="startDate">
              <ElDatePicker
                v-model="form.startDate"
                type="date"
                format="YYYY-MM-DD"
                placeholder="请选择开始时间"
              ></ElDatePicker>
            </ElFormItem>
            <ElFormItem prop="endDate">
              <ElDatePicker
                v-model="form.endDate"
                type="date"
                format="YYYY-MM-DD"
                placeholder="请选择结束时间"
              ></ElDatePicker>
            </ElFormItem>
          </div>
        </ElFormItem>
        <ElFormItem label="开关" prop="switch">
          <ElSwitch v-model="form.switch"></ElSwitch>
        </ElFormItem>
        <ElFormItem label="水果" prop="fruits">
          <ElCheckboxGroup v-model="form.fruits">
            <ElCheckbox label="apple">苹果</ElCheckbox>
            <ElCheckbox label="orange">橘子</ElCheckbox>
            <ElCheckbox label="banana">香蕉</ElCheckbox>
          </ElCheckboxGroup>
        </ElFormItem>
        <ElFormItem label="课程" prop="course">
          <ElRadioGroup v-model="form.course">
            <ElRadio label="yuwen">语文</ElRadio>
            <ElRadio label="yingwen">英文</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="备注" prop="remark">
          <ElInput
            v-model="form.remark"
            type="textarea"
            :maxlength="50"
            show-word-limit
            placeholder="请输入备注【只允许输入字母】"
          >
          </ElInput>
        </ElFormItem>
        <ElFormItem label="对象" prop="obj">
          <ElInput
            v-model="form.obj"
            type="textarea"
            :maxlength="50"
            show-word-limit
            placeholder="请输入一个包含 title 属性的对象"
          >
          </ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="submitForm(formRef)">提 交</ElButton>
          <ElButton @click="resetForm(formRef)">清 空</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>
