<template>
  <n-popover class="!p-0" trigger="manual" placement="bottom" :show="showPopover">
    <template #trigger>
      <hover-container
        tooltip-content="Message Notification"
        :inverted="theme.header.inverted"
        class="relative w-40px h-full"
        @click="showPopover = !showPopover"
      >
        <icon-clarity:notification-line class="text-18px" />
        <n-badge
          :value="count"
          :max="99"
          :class="[count < 10 ? '-right-2px' : '-right-10px']"
          class="absolute top-10px"
        />
      </hover-container>
    </template>
    <n-tabs
      v-model:value="currentTab"
      :class="[isMobile ? 'w-276px' : 'w-360px']"
      type="line"
      justify-content="space-evenly"
    >
      <n-tab-pane v-for="(item, index) in tabData" :key="item.key" :name="index">
        <template #tab>
          <div class="flex-x-center items-center" :class="[isMobile ? 'w-92px' : 'w-120px']">
            <span class="mr-5px">{{ item.name }}</span>
            <n-badge
              v-bind="item.badgeProps"
              :value="item.list.filter(message => !message.isRead).length"
              :max="99"
              show-zero
            />
          </div>
        </template>
        <loading-empty-wrapper
          class="h-360px"
          :loading="loading"
          :empty="item.list.length === 0"
          placeholder-class="bg-$n-color transition-background-color duration-300 ease-in-out"
        >
          <message-list :list="item.list" @read="handleRead" />
        </loading-empty-wrapper>
      </n-tab-pane>
    </n-tabs>
    <div v-if="showAction" class="flex border-t border-$n-divider-color cursor-pointer">
      <div class="flex-1 text-center py-10px" @click="handleClear">clear</div>
      <div class="flex-1 text-center py-10px border-l border-$n-divider-color" @click="handleAllRead">All read</div>
      <div class="flex-1 text-center py-10px border-l border-$n-divider-color" @click="handleLoadMore">check more</div>
    </div>
  </n-popover>
  <!-- <detail v-model:visible="visible" /> -->
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useThemeStore } from '@/store';
import { useBasicLayout } from '@/composables';
import { useBoolean } from '@/hooks';
// import detail from '@/views/order/components/detail.vue';
import MessageList from './message-list.vue';

defineOptions({ name: 'SystemMessage' });

const theme = useThemeStore();
const { isMobile } = useBasicLayout();
const { bool: loading, setBool: setLoading } = useBoolean();
const showPopover = ref(false);

const currentTab = ref(0);
// const { bool: visible, setTrue: openModal } = useBoolean();

const tabData = ref<App.MessageTab[]>([
  {
    key: 1,
    name: 'Notification',
    badgeProps: { type: 'warning' },
    list: [
      { id: 1, icon: 'ri:message-3-line', title: 'Food ready', date: '2022-06-17' },
      { id: 4, icon: 'ri:message-3-line', title: 'Food coming', date: '2022-06-17' },
      { id: 2, icon: 'ri:message-3-line', title: 'Food process', date: '2022-06-16' },
      { id: 3, icon: 'ri:message-3-line', title: 'Food cancel ', date: '2022-06-07' },
      {
        id: 5,
        icon: 'ri:message-3-line',
        title: 'error',
        date: '2022-06-17'
      }
    ]
  },
  {
    key: 2,
    name: 'message',
    badgeProps: { type: 'error' },
    list: [
      {
        id: 1,
        title: 'order id :123',
        svgIcon: 'avatar',
        description: 'where are you',
        date: '2021-11-07 22:45:32'
      },
      {
        id: 1,
        title: 'order id :1283',
        svgIcon: 'avatar',
        description: 'where are you',
        date: '2021-11-07 22:45:32'
      },
      {
        id: 1,
        title: 'order id :1243',
        svgIcon: 'avatar',
        description: 'late 30 min',
        date: '2021-11-07 22:45:32'
      },
      {
        id: 1,
        title: 'order id :144',
        svgIcon: 'avatar',
        description: 'where are you',
        date: '2021-11-07 22:45:32'
      },
      {
        id: 1,
        title: 'order id :1233',
        svgIcon: 'avatar',
        description: 'The food on the door',
        date: '2021-11-07 22:45:32'
      }
    ]
  }
  // {
  //   key: 3,
  //   name: '待办',
  //   badgeProps: { type: 'info' },
  //   list: [
  //     {
  //       id: 1,
  //       icon: 'ri:calendar-todo-line',
  //       title: '缓存主题配置',
  //       description: '任务正在计划中',
  //       date: '2022-06-17',
  //       tagTitle: '未开始',
  //       tagProps: { type: 'default' }
  //     },
  //     {
  //       id: 2,
  //       icon: 'ri:calendar-todo-line',
  //       title: '添加锁屏组件、全局Iframe组件',
  //       description: '任务正在计划中',
  //       date: '2022-06-17',
  //       tagTitle: '未开始',
  //       tagProps: { type: 'default' }
  //     },
  //     {
  //       id: 3,
  //       icon: 'ri:calendar-todo-line',
  //       title: '示例页面完善',
  //       description: '任务正在计划中',
  //       date: '2022-06-17',
  //       tagTitle: '未开始',
  //       tagProps: { type: 'default' }
  //     },
  //     {
  //       id: 4,
  //       icon: 'ri:calendar-todo-line',
  //       title: '表单、表格示例',
  //       description: '任务正在计划中',
  //       date: '2022-06-17',
  //       tagTitle: '未开始',
  //       tagProps: { type: 'default' }
  //     },
  //     {
  //       id: 5,
  //       icon: 'ri:calendar-todo-line',
  //       title: '性能优化(优化递归函数)',
  //       description: '任务正在计划中',
  //       date: '2022-06-17',
  //       tagTitle: '未开始',
  //       tagProps: { type: 'default' }
  //     },
  //     {
  //       id: 6,
  //       icon: 'ri:calendar-todo-line',
  //       title: '精简版(新分支thin)',
  //       description: '任务正在计划中',
  //       date: '2022-06-17',
  //       tagTitle: '未开始',
  //       tagProps: { type: 'default' }
  //     }
  //   ]
  // }
]);

const count = computed(() => {
  return tabData.value.reduce((acc, cur) => {
    return acc + cur.list.filter(item => !item.isRead).length;
  }, 0);
});

const showAction = computed(() => tabData.value[currentTab.value].list.length > 0);

function handleRead(index: number) {
  tabData.value[currentTab.value].list[index].isRead = true;
}

function handleAllRead() {
  tabData.value[currentTab.value].list.forEach(item => Object.assign(item, { isRead: true }));
}

function handleClear() {
  tabData.value[currentTab.value].list = [];
}

function handleLoadMore() {
  const { list } = tabData.value[currentTab.value];
  setLoading(true);
  setTimeout(() => {
    list.push(...tabData.value[currentTab.value].list);
    setLoading(false);
  }, 1000);
}
</script>
<style scoped></style>
