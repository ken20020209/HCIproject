<template>
  <n-modal v-model:show="modalVisible" preset="card" title="Detail" class="w-600px">
    <div style="overflow: auto">
      <n-timeline horizontal>
        <n-timeline-item type="default" content="pending" time="2018-04-03 19:46" />
        <n-timeline-item type="default" title="confirmed" time="2018-04-03 20:46" />
        <n-timeline-item type="error" title="delivered" time="2018-04-03 20:46" />
        <n-timeline-item type="default" title="completed" time="" />
      </n-timeline>
    </div>
    <n-card class="mt-4" :bordered="false">
      <n-tabs>
        <n-tab-pane name="Customer">
          <n-space vertical size="large">
            <!-- <n-card>
              <span>Order ID:</span>
              <span>123456789</span>
            </n-card> -->
            <n-card title="Customer name" size="small">
              <span>John Doe</span>
            </n-card>
            <n-card title="Customer phone" size="small">
              <span>9651 9999</span>
            </n-card>
            <n-card title="Customer address" size="small">
              <span>2911,ive,cw</span>
            </n-card>
            <n-card title="Order time" size="small">
              <span>10:22</span>
            </n-card>
            <n-card title="Order status" size="small">
              <span>delivered</span>
            </n-card>
          </n-space>
        </n-tab-pane>
        <n-tab-pane name="Food">
          <n-table>
            <thead>
              <tr>
                <th>Food Name</th>
                <th>image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chicken</td>
                <td><n-image src="/food/chenna-poda.png"></n-image></td>
                <td>10</td>
                <td>2</td>
                <td>20</td>
              </tr>
              <tr>
                <td>Chicken</td>
                <td><n-image src="/food/pani-puri.png"></n-image></td>
                <td>10</td>
                <td>2</td>
                <td>20</td>
              </tr>
              <tr>
                <td>Chicken</td>
                <td><n-image src="/food/kp.png"></n-image></td>
                <td>10</td>
                <td>2</td>
                <td>20</td>
              </tr>
            </tbody>
          </n-table>
        </n-tab-pane>
        <n-tab-pane name="Chat">
          <n-card>
            <n-image src="/chat.png"></n-image>
          </n-card>
        </n-tab-pane>
        <n-tab-pane name="map">
          <n-card>
            <n-space>
              <n-button
                :on-click="
                  () => {
                    mapPath = '/map1.png';
                  }
                "
              >
                restaurant
              </n-button>
              <n-button
                :on-click="
                  () => {
                    mapPath = '/map2.png';
                  }
                "
              >
                Customer
              </n-button>

              <n-image :src="mapPath"></n-image>
            </n-space>
          </n-card>
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <n-space justify="end">
      <n-button>Confirm</n-button>
      <n-button @click="closeModal">Cancel</n-button>
    </n-space>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import type { UploadFileInfo } from 'naive-ui';

// import { from } from 'form-data';

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

const mapPath = ref('/map1.png');
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

type FormModel = Pick<FoodManagement.Food, 'name' | 'price' | 'image' | 'description' | 'status'>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const fileList = ref<UploadFileInfo[]>([]);

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
        url: `${model.image}.png`
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
