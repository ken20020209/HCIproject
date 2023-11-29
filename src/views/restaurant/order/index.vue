<template>
  <div class="h-full overflow-hidden">
    <n-card title="Orders" :bordered="false" class="h-full rounded-8px shadow-sm">
      <n-space :vertical="true">
        <n-space>
          <n-button @click="getTableData('0')">all</n-button>
          <n-button @click="getTableData('1')">pending</n-button>
          <n-button @click="getTableData('2')">confirmed</n-button>
          <n-button @click="getTableData('3')">delivered</n-button>
          <n-button @click="getTableData('4')">completed</n-button>
          <n-button @click="getTableData('5')">cancelled</n-button>
        </n-space>
        <loading-empty-wrapper class="h-960px" :loading="loading" :empty="empty">
          <n-data-table :columns="columns" :data="dataSource" :flex-height="true" class="h-960px" default-expand-all />
        </loading-empty-wrapper>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import type { DataTableColumn } from 'naive-ui';
import { NSpace, NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchFoodList, fetchOrderList } from '@/service';
import { useLoadingEmpty } from '@/hooks';
import { orderStatusLabels } from '~/src/constants';
// import { getRandomInteger } from '@/utils';

// interface DataSource {
//   name: string;
//   age: number;
//   address: string;
// }

const { loading, startLoading, endLoading, empty } = useLoadingEmpty();

interface Order extends OrderManagement.Order {
  children?: FoodManagement.Food[];
}

const columns: DataTableColumn<Order>[] = [
  {
    title: 'index',
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
      if (row.status === '1') {
        return (
          <NSpace justify={'center'}>
            <NButton
              size={'small'}
              onClick={() => {
                handleEdit(row.name);
              }}
            >
              OK
            </NButton>
            <NPopconfirm
              onPositiveClick={() => {
                handleDelete(row.name);
              }}
            >
              {{
                default: () => 'Confirm Cancel',
                trigger: () => <NButton size={'small'}>Cancel</NButton>
              }}
            </NPopconfirm>
          </NSpace>
        );
      }
      return <span></span>;
    }
  }
];

const dataSource = ref<Order[]>([]);

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
  const { data } = await fetchOrderList();
  const food = await fetchFoodList();
  // console.log(data);
  let cnt = 0;
  if (data) {
    setTimeout(() => {
      dataSource.value = data.filter(item => item.status === type || type === '0');
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

function handleEdit(_name: string) {
  window.$message?.info('complete successfully');
}

function handleDelete(_name: string) {
  window.$message?.info('deleted successfully');
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
