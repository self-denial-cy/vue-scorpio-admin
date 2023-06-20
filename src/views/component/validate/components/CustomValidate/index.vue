<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus';

const formRef = ref<FormInstance | null>(null);

const form = reactive({
  password: '',
  repeatPassword: '',
  age: ''
});

const rules = reactive<FormRules>({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      validator(rule, value, callback) {
        console.log(rule);
        if (!value) {
          callback(new Error('请输入密码'));
        } else {
          if (form.repeatPassword) {
            if (formRef.value) {
              formRef.value.validateField('repeatPassword');
            }
          }
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  repeatPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator(rule, value, callback) {
        console.log(rule);
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== form.password) {
          callback(new Error('重复密码错误'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    {
      validator(rule, value, callback) {
        console.log(rule);
        if (!value) {
          callback(new Error('请输入年龄'));
        } else {
          if (!Number.isInteger(value)) {
            callback(new Error('年龄必须为整数'));
          } else {
            if (value < 18) {
              callback(new Error('年龄最小为18'));
            } else {
              callback();
            }
          }
        }
      },
      trigger: 'blur'
    }
  ]
});

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
        <span class="text-16px">自定义表单规则校验</span>
      </template>
      <ElForm ref="formRef" :model="form" :rules="rules" :label-width="120" status-icon>
        <ElFormItem label="密码" prop="password">
          <ElInput v-model="form.password" type="password" placeholder="请输入密码" clearable show-password></ElInput>
        </ElFormItem>
        <ElFormItem label="重复密码" prop="repeatPassword">
          <ElInput
            v-model="form.repeatPassword"
            type="password"
            placeholder="请再次输入密码"
            clearable
            show-password
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="年龄" prop="age">
          <ElInput v-model.number="form.age" placeholder="请输入年龄" clearable></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="submitForm(formRef)">提 交</ElButton>
          <ElButton @click="resetForm(formRef)">清 空</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>
