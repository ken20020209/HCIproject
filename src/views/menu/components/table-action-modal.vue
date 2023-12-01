<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="name" path="name">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="price" path="price">
          <n-input-number v-model:value="formModel.price" clearable />
        </n-form-item-grid-item>
        <!-- <n-form-item-grid-item :span="12" label="image" path="image">
          <n-image v-model:src="formModel.image"></n-image>
        </n-form-item-grid-item> -->
        <n-form-item-grid-item :span="12" label="image" path="image">
          <n-upload :default-file-list="fileList" list-type="image-card">+</n-upload>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="description" path="description">
          <n-input v-model:value="formModel.description" type="textarea" :autosize="{ minRows: 3 }" />
        </n-form-item-grid-item>

        <n-form-item-grid-item :span="12" label="status" path="status">
          <n-select v-model:value="formModel.status" :options="foodStatusOptions" />
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">cancel</n-button>
        <n-button class="w-72px" type="primary" @click="handleSubmit">confirm</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import type { FormInst, FormItemRule, UploadFileInfo } from 'naive-ui';
// import { from } from 'form-data';
import { foodStatusOptions } from '@/constants';
import { createRequiredFormRule } from '@/utils';

export interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /**
   * 弹窗类型
   * add: 新增
   * edit: 编辑
   */
  type?: 'add' | 'edit';
  /** 编辑的表格行数据 */
  editData?: FoodManagement.Food | null;
}

export type ModalType = NonNullable<Props['type']>;

defineOptions({ name: 'TableActionModal' });

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null
});

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});
const closeModal = () => {
  modalVisible.value = false;
};

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: 'add food',
    edit: 'edit food'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<FoodManagement.Food, 'name' | 'price' | 'image' | 'description' | 'status'>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const fileList = ref<UploadFileInfo[]>([]);

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  name: createRequiredFormRule('enter name'),
  price: createRequiredFormRule('enter price'),
  image: createRequiredFormRule('upload image'),
  description: createRequiredFormRule('enter description'),
  status: createRequiredFormRule('select status')
};

function createDefaultFormModel(): FormModel {
  return {
    name: '',
    price: null,
    image: '',
    description: null,
    status: null
  };
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
  if (model.image?.length !== 0) {
    fileList.value = [
      {
        id: '1',
        name: 'image',
        status: 'finished',
        url: `${model.image}`
      }
    ];
  } else {
    fileList.value = [];
  }
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    }
  };

  handlers[props.type]();
}

async function handleSubmit() {
  await formRef.value?.validate();
  window.$message?.success('success!');
  closeModal();
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);
</script>

<style scoped></style>
