<template>
  <div class="overflow-hidden">
    <n-card title="Menu Management" :bordered="false" class="h-full rounded-8px shadow-sm">
      <div class="flex-col h-full">
        <n-space class="pb-12px" justify="space-between">
          <n-space>
            <n-button v-if="hasPermission('restaurant')" type="primary" @click="handleAddTable">
              <icon-ic-round-plus class="mr-4px text-20px" />
              Create
            </n-button>
            <n-button v-if="hasPermission('restaurant')" type="error" @click="handleDeleteSelectedTable">
              <icon-ic-round-delete class="mr-4px text-20px" />
              Delete
            </n-button>
            <n-button v-if="hasPermission('customer')" type="success" @click="handleCheckout">
              <icon-ic-outline-check class="mr-4px text-20px" />
              checkout
            </n-button>
            <!-- <n-button type="success">
              <icon-uil:export class="mr-4px text-20px" />
              Export Excel
            </n-button> -->
            <!-- search bar -->

            <n-input placeholder="Search" class="w-200px" />
          </n-space>
          <n-space align="center" :size="18">
            <n-button size="small" type="primary" @click="getTableData">
              <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
              Refresh Table
            </n-button>
            <column-setting v-model:columns="columns" />
          </n-space>
        </n-space>
        <n-data-table
          :columns="columns"
          :data="tableData"
          :loading="loading"
          :pagination="pagination"
          flex-height
          class="flex-1-hidden"
        />
        <table-action-modal v-model:visible="visible" :type="modalType" :edit-data="editData" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
// import { log, table } from 'console';
// import { count } from 'console';
import { reactive, ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui';
import type { DataTableColumns, PaginationProps } from 'naive-ui';
import { fetchFoodList } from '@/service';
import { usePermission } from '@/composables';
import { useBoolean, useLoading } from '@/hooks';
import { foodStatusLabels } from '~/src/constants';
import { useCartStore, useAppStore } from '~/src/store';
import TableActionModal from './components/table-action-modal.vue';
import type { ModalType } from './components/table-action-modal.vue';
import ColumnSetting from './components/column-setting.vue';

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();
const { hasPermission } = usePermission();

const qtys = ref<number[]>([]);
const tableData = ref<FoodManagement.Food[]>([]);
function setTableData(data: FoodManagement.Food[]) {
  if (hasPermission('customer')) tableData.value = data.filter(item => item.status === '1');
  else tableData.value = data;
  data.forEach(() => {
    qtys.value.push(1);
  });
}

async function getTableData() {
  startLoading();
  const { data } = await fetchFoodList();
  if (data) {
    setTimeout(() => {
      setTableData(data);
      endLoading();
    }, 1000);
  }
}

const columns: Ref<DataTableColumns<FoodManagement.Food>> = ref([
  {
    type: 'selection',
    align: 'center'
  },
  {
    key: 'index',
    title: 'index',
    align: 'center'
  },
  {
    key: 'name',
    title: 'name',
    align: 'center'
  },
  {
    key: 'price',
    title: 'price',
    align: 'center'
  },
  {
    key: 'image',
    title: 'image',
    align: 'center',
    render: row => {
      return <n-image src={row.image} alt="" width="100" />;
    }
  },
  {
    key: 'description',
    title: 'description',
    align: 'center'
    // render: row => {
    //   if (window.innerWidth > 768) return <span>{row.description}</span>;
    //   return <span></span>;
    // }
  },
  {
    key: 'status',
    title: 'status',
    align: 'center',
    render: row => {
      if (row.status) {
        const tagTypes: Record<FoodManagement.FoodStatusKey, NaiveUI.ThemeColor> = {
          '1': 'success',
          '2': 'error',
          '3': 'warning'
        };

        return <NTag type={tagTypes[row.status]}>{foodStatusLabels[row.status]}</NTag>;
      }
      return <span></span>;
    }
  },
  {
    key: 'actions',
    title: 'actions',
    align: 'center',
    render: (row, index) => {
      if (hasPermission('restaurant')) {
        return (
          <NSpace justify={'center'}>
            <NButton size={'small'} onClick={() => handleEditTable(row.id)}>
              edit
            </NButton>
            <NPopconfirm onPositiveClick={() => handleDeleteTable(row.id)}>
              {{
                default: () => 'Confirm to delete?',
                trigger: () => <NButton size={'small'}>delete</NButton>
              }}
            </NPopconfirm>
          </NSpace>
        );
      } else if (hasPermission('customer')) {
        return (
          <NSpace justify={'center'}>
            <n-input-number min={1} max={10} class="w-100px" v-model:value={qtys.value[index]} />
            <NButton
              onClick={() => {
                window.$message?.success(`added ${qtys.value[index]} ${row.name} to cart`);
                useCartStore().addItem(row, qtys.value[index]);
              }}
            >
              Buy
            </NButton>
          </NSpace>
        );
      }
      return <NSpace></NSpace>;
    }
  }
]) as Ref<DataTableColumns<FoodManagement.Food>>;

const modalType = ref<ModalType>('add');

function setModalType(type: ModalType) {
  modalType.value = type;
}

const editData = ref<FoodManagement.Food | null>(null);

function setEditData(data: FoodManagement.Food | null) {
  editData.value = data;
}

function handleAddTable() {
  openModal();
  setModalType('add');
}

function handleEditTable(rowId: string) {
  const findItem = tableData.value.find(item => item.id === rowId);
  if (findItem) {
    setEditData(findItem);
  }
  setModalType('edit');
  openModal();
}

// delete table when selected
function handleDeleteSelectedTable() {
  window.$message?.info('deleted selected');

  // get n-table
}
function handleDeleteTable(rowId: string) {
  window.$message?.info(`click to deleted rowId: ${rowId}`);
  tableData.value = tableData.value.filter(item => item.id !== rowId);
}
const handleCheckout = () => {
  window.$message?.info('checkout');
  const app = useAppStore();
  app.openSettingDrawer();
};

const pagination: PaginationProps = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20, 25, 30],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  }
});

function init() {
  getTableData();
}
onMounted(() => {
  init();
});
// 初始化
init();
</script>

<style scoped></style>
