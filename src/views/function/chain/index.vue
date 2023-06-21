<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { ChainExecuter, ChainBoolNode, ChainNode } from '@/helpers';

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
  lanSheep: [{ required: true, message: '请选择是否出战', trigger: 'blur' }],
  wolfs: [
    {
      trigger: 'change',
      validator(rule, value, callback) {
        console.log(rule);
        const executer = new ChainExecuter();
        const lenNode = new ChainNode(
          () => value.length,
          null,
          () => callback(new Error('至少一只狼出战'))
        );
        const greyWolfNode = new ChainNode(
          () => value.includes('greyWolf'),
          null,
          () => callback(new Error('灰太狼必须参战'))
        );
        executer.append(lenNode);
        executer.append(greyWolfNode);
        executer.executeAll();
        callback();
      }
    }
  ]
});

const canLanSheetFight = computed(() => {
  return (
    form.xiSheep === 'fight' &&
    form.feiSheep === 'fight' &&
    form.manSheep === 'secretWeapon' &&
    !form.wolfs.includes('redWolf')
  );
});

async function fight() {
  if (!(await formRef.value?.validate())) return;
  const executer = new ChainExecuter();
  /**
   * 狼群获胜：
   *  1. 西瓜太狼出战
   *  2. 夜晚战斗
   *  3. 懒羊羊逃跑
   */
  const watermelonWar = new ChainBoolNode(() => form.isWatermelonWar);
  const nightWar = new ChainBoolNode(() => form.time === 'night');
  const lanSheepEscape = new ChainBoolNode(() => form.lanSheep === 'escape');
  executer.append(watermelonWar);
  executer.append(nightWar);
  executer.append(lanSheepEscape);
  if (executer.execute()) {
    ElMessage.error('狼堡获胜');
  } else {
    ElMessage.success('羊村获胜');
  }
}
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
            <ElOption label="出战" value="fight" :disabled="!canLanSheetFight"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="狼堡出站" prop="wolfs">
          <ElCheckboxGroup v-model="form.wolfs">
            <ElCheckbox label="greyWolf">灰太狼</ElCheckbox>
            <ElCheckbox label="redWolf">红太狼</ElCheckbox>
            <ElCheckbox label="smallWolf">小灰灰</ElCheckbox>
            <ElCheckbox label="bananaWolf">蕉太狼</ElCheckbox>
          </ElCheckboxGroup>
        </ElFormItem>
        <ElFormItem label="西瓜太狼参战" prop="isWatermelonWar">
          <ElSwitch v-model="form.isWatermelonWar"></ElSwitch>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="danger" @click="fight">开战</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>
