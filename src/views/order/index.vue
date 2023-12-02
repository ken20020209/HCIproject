<template>
  <div class="h-full">
    <n-card title="Orders" :bordered="false" class="h-full rounded-8px shadow-sm">
      <n-space class="pb-12px" justify="space-between">
        <n-space>
          <n-button @click="getTableData('0')">all</n-button>
          <n-button @click="getTableData('1')">preparing</n-button>
          <n-button @click="getTableData('2')">wait pick up</n-button>
          <n-button @click="getTableData('3')">delivering</n-button>
          <n-button @click="getTableData('4')">completed</n-button>
          <n-button @click="getTableData('5')">cancelled</n-button>
        </n-space>
        <n-space>
          <n-button @click="getTableData('6')">work mode</n-button>
        </n-space>
      </n-space>
      <loading-empty-wrapper v-if="workMode === false" class="h-960px" :loading="loading" :empty="empty">
        <n-data-table :columns="columns" :data="dataSource" :flex-height="true" class="h-960px" default-expand-all />
      </loading-empty-wrapper>
      <n-grid v-if="workMode === true" cols="12 s:4 m:12 l:12" x-gap="16" y-gap="16">
        <n-grid-item span="4">
          <n-layout>
            <n-card v-for="order in preparingList" :key="order.key" :title="order.key">
              <n-space>
                <n-card v-for="food in order.children" :key="food.id" :title="food.name ? food.name : ''" size="small">
                  <n-space vertical>
                    <n-image :src="food?.image ? food.image : ''" />
                    <n-tag>qty:{{ food.quantity }}</n-tag>
                  </n-space>
                </n-card>
              </n-space>
              <br />
              <n-space justify="space-between">
                <n-space>
                  <n-tag type="success">preparing</n-tag>
                </n-space>
                <n-space>
                  <n-button
                    v-if="hasPermission('restaurant')"
                    :on-click="
                      () => {
                        handleEdit(order);
                        // console.log(order.status);
                      }
                    "
                  >
                    OK
                  </n-button>
                  <NPopconfirm
                    v-if="hasPermission('restaurant')"
                    :on-positive-click="
                      () => {
                        handleDelete(order);
                      }
                    "
                  >
                    <template #trigger>
                      <n-button>Cancel</n-button>
                    </template>
                    <template #default>Confirm Cancel</template>
                  </NPopconfirm>
                  <n-button
                    :on-click="
                      () => {
                        openModal();
                      }
                    "
                  >
                    detail
                  </n-button>
                </n-space>
              </n-space>
            </n-card>
          </n-layout>
        </n-grid-item>
        <n-grid-item span="4">
          <n-layout>
            <n-card v-for="order in waitManList" :key="order.key" :title="order.key">
              <n-space justify="space-between">
                <n-space>
                  <n-tag type="warning">wait pick up</n-tag>
                </n-space>
                <n-space>
                  <n-button
                    v-if="hasPermission('delivery')"
                    :on-click="
                      () => {
                        handleEdit(order);
                        // console.log(order.status);
                      }
                    "
                  >
                    OK
                  </n-button>
                  <NPopconfirm
                    v-if="hasPermission('restaurant')"
                    :on-positive-click="
                      () => {
                        handleDelete(order);
                      }
                    "
                  >
                    <template #trigger>
                      <n-button>Cancel</n-button>
                    </template>
                    <template #default>Confirm Cancel</template>
                  </NPopconfirm>
                  <n-button
                    :on-click="
                      () => {
                        openModal();
                      }
                    "
                  >
                    detail
                  </n-button>
                </n-space>
              </n-space>
            </n-card>
          </n-layout>
        </n-grid-item>
        <n-grid-item span="4">
          <n-layout>
            <n-card v-for="order in WaitPickUpList" :key="order.key" :title="order.key">
              <n-space justify="space-between">
                <n-space>
                  <n-tag type="error">delivering</n-tag>
                </n-space>
                <n-space>
                  <n-button
                    v-if="hasPermission('delivery')"
                    :on-click="
                      () => {
                        handleEdit(order);
                        // console.log(order.status);
                      }
                    "
                  >
                    OK
                  </n-button>
                  <NPopconfirm
                    v-if="hasPermission('delivery')"
                    :on-positive-click="
                      () => {
                        handleDelete(order);
                      }
                    "
                  >
                    <template #trigger>
                      <n-button>Cancel</n-button>
                    </template>
                    <template #default>Confirm Cancel</template>
                  </NPopconfirm>
                  <n-button
                    :on-click="
                      () => {
                        openModal();
                      }
                    "
                  >
                    detail
                  </n-button>
                </n-space>
              </n-space>
            </n-card>
          </n-layout>
        </n-grid-item>

        <!-- <n-grid-item span="4">123</n-grid-item>
        <n-grid-item span="4">123</n-grid-item>
        <n-grid-item span="4">123</n-grid-item> -->
      </n-grid>
    </n-card>
    <detail v-model:visible="visible" />
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref, computed } from 'vue';
import type { DataTableColumn } from 'naive-ui';
import { NSpace, NButton, NPopconfirm, NTag } from 'naive-ui';
import { toInteger } from 'lodash-es';
import { fetchFoodList, fetchOrderList } from '@/service';
import { usePermission } from '@/composables';
import { useLoadingEmpty, useBoolean } from '@/hooks';
import { orderStatusLabels } from '~/src/constants';
import detail from './components/detail.vue';
// import { getRandomInteger } from '@/utils';

// interface DataSource {
//   name: string;
//   age: number;
//   address: string;
// }
const { hasPermission } = usePermission();
const { bool: visible, setTrue: openModal } = useBoolean();
const workMode = ref(false);
const { loading, startLoading, endLoading, empty } = useLoadingEmpty();
const dataSource = ref<Order[]>([]);
const preparingList = computed(() => {
  return dataSource.value.filter(item => item.status === '1');
});
const waitManList = computed(() => {
  return dataSource.value.filter(item => item.status === '2');
});
const WaitPickUpList = computed(() => {
  return dataSource.value.filter(item => item.status === '3');
});
// const completedList = computed(() => {
//   return dataSource.value.filter(item => item.status === '4');
// });
interface Order extends OrderManagement.Order {
  children?: FoodManagement.Food[];
}

const columns: DataTableColumn<Order>[] = [
  {
    title: 'ID',
    key: 'index',
    align: 'center'
  },
  {
    title: 'description',
    key: 'description',
    align: 'center'
  },
  {
    title: 'food',
    key: 'food',
    align: 'center',
    children: [
      // {
      //   key: 'image',
      //   title: 'image',
      //   align: 'center'
      // },
      {
        title: 'name',
        key: 'name',
        align: 'center'
      },
      {
        title: 'price',
        key: 'price',
        align: 'center'
      },
      {
        title: 'quantity',
        key: 'quantity',
        align: 'center'
      }
    ]
  },
  {
    title: 'time',
    key: 'time',
    align: 'center'
  },
  {
    title: 'status',
    key: 'status',
    align: 'center',
    render: row => {
      if (row.status) {
        const tagTypes: Record<OrderManagement.OrderStatusKey, NaiveUI.ThemeColor> = {
          '1': 'success',
          '2': 'warning',
          '3': 'error',
          '4': 'info',
          '5': 'success'
        };
        return <NTag type={tagTypes[row.status]}>{orderStatusLabels[row.status]}</NTag>;
      }
      return <span></span>;
    }
  },
  {
    key: 'action',
    title: 'Action',
    align: 'center',
    render: row => {
      if ((row.status === '1' && hasPermission('restaurant')) || (row.status === '3' && hasPermission('delivery'))) {
        return (
          <NSpace justify={'center'}>
            <NButton
              size={'small'}
              onClick={() => {
                handleEdit(row);
              }}
            >
              OK
            </NButton>
            <NPopconfirm
              on-positive-click={() => {
                handleDelete(row);
              }}
            >
              {{
                default: () => 'Confirm Cancel',
                trigger: () => <NButton size={'small'}>Cancel</NButton>
              }}
            </NPopconfirm>
            <NButton
              size={'small'}
              on-click={() => {
                openModal();
              }}
            >
              detail
            </NButton>
          </NSpace>
        );
      } else if (row.status === '2') {
        if (hasPermission('delivery')) {
          return (
            <NSpace justify={'center'}>
              <NButton
                size={'small'}
                on-click={() => {
                  handleEdit(row);
                }}
              >
                OK
              </NButton>
            </NSpace>
          );
        } else if (hasPermission('restaurant'))
          return (
            <NSpace justify={'center'}>
              <NPopconfirm
                on-positive-click={() => {
                  handleDelete(row);
                }}
              >
                {{
                  default: () => 'Confirm Cancel',
                  trigger: () => <NButton size={'small'}>Cancel</NButton>
                }}
              </NPopconfirm>
              <NButton
                size={'small'}
                on-click={() => {
                  openModal();
                }}
              >
                detail
              </NButton>
            </NSpace>
          );
      } else if (row.status !== null) {
        return (
          <NButton
            size={'small'}
            on-click={() => {
              openModal();
            }}
          >
            detail
          </NButton>
        );
      }
      return (
        <NButton
          size={'small'}
          on-click={() => {
            openModal();
          }}
        >
          detail
        </NButton>
      );
    }
  }
];

// function createDataSource(): OrderManagement.Order[] {
//   return Array(100)
//     .fill(1)
//     .map((_item, index) => {
//       return {
//         name: `Name${index}`,
//         age: getRandomInteger(30, 20),
//         address: '中国'
//       };
//     });
// }

// function getDataSource() {
//   startLoading();
//   setTimeout(() => {
//     // dataSource.value = createDataSource();
//     endLoading();
//     setEmpty(!dataSource.value.length);
//   }, 1000);
// }

// function getEmptyDataSource() {
//   startLoading();
//   setTimeout(() => {
//     dataSource.value = [];
//     endLoading();
//     setEmpty(!dataSource.value.length);
//   }, 1000);
// }

async function getTableData(type: string = '0') {
  startLoading();

  if (type === '6') workMode.value = true;
  else workMode.value = false;
  const { data } = await fetchOrderList();
  const food = await fetchFoodList();
  // console.log(data);
  let cnt = 0;
  if (data) {
    setTimeout(() => {
      dataSource.value = data.filter(
        item =>
          item.status === type ||
          type === '0' ||
          (type === '6' && item.status === '1') ||
          (type === '6' && item.status === '2') ||
          (type === '6' && item.status === '3')
      );
      dataSource.value.forEach((item, index) => {
        // array 1-5
        const rand = Math.floor(Math.random() * 5) + 1;
        item.index = index + 1;
        item.children = food.data?.slice(cnt, cnt + rand);
        item.children?.forEach((foodItem, foodIndex) => {
          foodItem.index = foodIndex + 1;
          foodItem.description = '';
          foodItem.status = null;
        });
        cnt += rand;
      });
      endLoading();
    }, 1000);
  }
}

function handleEdit(Order: OrderManagement.Order) {
  window.$message?.info('complete successfully');
  if (Order.status) Order.status = `${toInteger(Order.status) + 1}`;
}

function handleDelete(Order: OrderManagement.Order) {
  window.$message?.info('deleted successfully');
  if (Order.status) Order.status = `${toInteger(Order.status) - 1}`;
  if (Order.status === '0') {
    // delete
    Order.status = '5';
  }
}

onMounted(() => {
  getTableData();
});
function init() {
  getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
