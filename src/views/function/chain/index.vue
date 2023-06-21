<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

interface IForm {
  time: string;
  xiSheep: string;
  feiSheep: string;
  manSheep: string;
  lanSheep: string;
  wolfs: string[];
  isWatermelonWar: boolean;
}

const formRef = ref<FormInstance | null>(null);

const form = reactive<IForm>({
  time: '',
  xiSheep: '',
  feiSheep: '',
  manSheep: '',
  lanSheep: '',
  wolfs: [],
  isWatermelonWar: false
});

const rules = reactive<FormRules>({
  time: [{ required: true, message: '请选择战斗时间', trigger: 'change' }],
  xiSheep: [{ required: true, message: '请选择是否出战', trigger: 'blur' }],
  feiSheep: [{ required: true, message: '请选择是否出战', trigger: 'blur' }],
  manSheep: [{ required: true, message: '请选择是否出战', trigger: 'blur' }],
  lanSheep: [{ required: true, message: '请选择是否出战', trigger: 'blur' }]
});
</script>

<template>
  <div>
    <ElCard shadow="hover">
      <template #header>
        <span class="text-18px">责任链模式</span>
      </template>
      <pre class="text-14px">
        游戏规则:
         1. 狼堡当中灰太狼必须出战
         2. 懒羊羊十分胆小, 它出战必须满足以下条件
            1. 喜羊羊出战
            2. 沸羊羊出战
            3. 慢羊羊必须拿出秘密武器
            4. 红太狼未出战
         3. 当懒羊羊参战且西瓜太狼未参战时, 羊群在白天能够战胜狼群
         4. 夜晚羊群一定被会抓
         5. 如果西瓜太狼参战, 羊群必被抓
      </pre>
      <ElForm ref="formRef" :model="form" :rules="rules" :label-width="120" status-icon>
        <ElFormItem label="战斗时间" prop="time">
          <ElRadioGroup v-model="form.time">
            <ElRadio label="day">白天</ElRadio>
            <ElRadio label="night">夜晚</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="喜羊羊" prop="xiSheep">
          <ElSelect v-model="form.xiSheep" clearable placeholder="请选择是否出战">
            <ElOption label="出战" value="fight"></ElOption>
            <ElOption label="逃跑" value="escape"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="沸羊羊" prop="feiSheep">
          <ElSelect v-model="form.feiSheep" clearable placeholder="请选择是否出战">
            <ElOption label="出战" value="fight"></ElOption>
            <ElOption label="逃跑" value="escape"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="慢羊羊" prop="manSheep">
          <ElSelect v-model="form.manSheep" clearable placeholder="请选择是否出战">
            <ElOption label="逃跑" value="escape"></ElOption>
            <ElOption label="拐杖" value="crutch"></ElOption>
            <ElOption label="秘密武器" value="secretWeapon"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="懒羊羊" prop="lanSheep">
          <ElSelect v-model="form.lanSheep" clearable placeholder="请选择是否出战">
            <ElOption label="逃跑" value="escape"></ElOption>
            <ElOption label="出战" value="fight"></ElOption>
          </ElSelect>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>
