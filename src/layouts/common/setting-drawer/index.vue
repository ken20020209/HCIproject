<template>
  <n-drawer :show="app.settingDrawerVisible" display-directive="show" :width="330" @mask-click="app.closeSettingDrawer">
    <n-drawer-content :title="title" :native-scrollbar="false">
      <!-- <dark-mode />
      <layout-mode />
      <theme-color-select />
      <page-func />
      <page-view />
      <theme-config /> -->
      <n-space justify="center">
        <n-card v-for="(food, index) in foods" :key="food.id">
          {{ food.name }}
          <n-image v-if="food.image" :src="food.image" />
          <n-space>
            <n-input-number v-model:value="qtys[index]" :min="1" :max="10" class="w-100px" />
            <n-button @click="foodCart.removeItem(index)">Remove</n-button>
          </n-space>
          <n-space v-if="food.price">Price: ${{ food.price }}</n-space>
          <n-space v-if="food.price">Sub total: ${{ food.price * qtys[index] }}</n-space>
        </n-card>

        <n-tag type="success" size="large">Total: ${{ totalPrice }}</n-tag>

        <n-button type="error" @click="foodCart.clearCart()">Clear Cart</n-button>
        <n-button type="success" @click="handlePay">PAY</n-button>
      </n-space>
    </n-drawer-content>
  </n-drawer>
  <drawer-button v-if="showButton" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore, useCartStore } from '@/store';
import { useRouterPush } from '@/composables';
import { DrawerButton } from './components';

defineOptions({ name: 'SettingDrawer' });
const { routerPush } = useRouterPush();
const app = useAppStore();
const title = ref('Cart');
const foodCart = useCartStore();
const foods = foodCart.items;
const qtys = foodCart.qtys;

const showButton = import.meta.env.DEV || import.meta.env.VITE_VERCEL === 'Y';

const totalPrice = computed(() => {
  const count = foods.reduce((acc, food, index) => {
    if (food.price) return acc + food.price * qtys[index];
    return acc;
  }, 0);
  return count;
});

const handlePay = () => {
  app.closeSettingDrawer();
  if (foods.length === 0) {
    window.$message?.error('Please add food to cart first!');
    return;
  }
  routerPush({ path: '/checkout' });
};
</script>

<style scoped></style>
