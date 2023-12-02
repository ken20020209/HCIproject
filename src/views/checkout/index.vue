<template>
  <div>
    <n-grid x-gap="16" y-gap="16" cols="6 s:6 m:12" responsive="screen">
      <n-grid-item span="6">
        <n-card title="Shipping address">
          <n-grid cols="6 s:6 m:12" x-gap="16" y-gap="16" responsive="screen">
            <n-grid-item :span="6">
              <n-card title="Address">
                <n-input placeholder="Address" type="textarea" />
              </n-card>
            </n-grid-item>
            <n-grid-item :span="6">
              <n-card title="City">
                <n-input placeholder="City" />
              </n-card>
            </n-grid-item>
            <n-grid-item :span="6">
              <n-card title="State">
                <n-input placeholder="State" />
              </n-card>
            </n-grid-item>
            <n-grid-item :span="6">
              <n-card title="Zip">
                <n-input placeholder="Zip" />
              </n-card>
            </n-grid-item>
          </n-grid>
          <br />
          <n-space justify="end">
            <n-button type="success" @click="saveAddress">Save</n-button>
          </n-space>
        </n-card>
        <br />
        <n-card title="Payment details">
          <n-grid cols="6 s:6 m:12" x-gap="16" y-gap="16" responsive="screen">
            <n-grid-item :span="8">
              <n-card title="Name on card">
                <n-input placeholder="Name on card" />
              </n-card>
            </n-grid-item>
            <n-grid-item :span="4">
              <n-card title="CVV">
                <n-input placeholder="CVV" />
              </n-card>
            </n-grid-item>
            <n-grid-item :span="8">
              <n-card title="Credit card number">
                <n-input placeholder="Credit card number" />
              </n-card>
            </n-grid-item>
            <n-grid-item :span="4">
              <n-card title="Expiration">
                <n-input placeholder="Expiration" />
              </n-card>
            </n-grid-item>
          </n-grid>
          <br />
          <n-space justify="end">
            <n-button type="success" @click="savePayment">Save</n-button>
          </n-space>
        </n-card>
      </n-grid-item>
      <!-- <n-grid-item :span="1"></n-grid-item> -->
      <n-grid-item :span="4">
        <n-card title="Order summary">
          <n-space justify="center">
            <n-grid cols="4 s:8 m:12" y-gap="16" x-gap="16" responsive="screen">
              <n-grid-item v-for="(food, index) in foods" :key="food.id" :span="4">
                <n-space justify="center">
                  <n-card :title="food.name ? food.name : ''">
                    <!-- {{ food.name }} -->
                    <n-image v-if="food.image" :src="food.image" />
                    <n-space>
                      <n-input-number v-model:value="qtys[index]" :min="1" :max="10" class="w-100px" />
                      <n-button @click="foodCart.removeItem(index)">Remove</n-button>
                    </n-space>
                    <n-space v-if="food.price">Price: ${{ food.price }}</n-space>
                    <n-space v-if="food.price">Sub total: ${{ food.price * qtys[index] }}</n-space>
                  </n-card>
                </n-space>
              </n-grid-item>

              <n-grid-item :span="12">
                <n-space justify="center">
                  <n-tag type="success" size="large">Total: ${{ totalPrice }}</n-tag>
                  <n-button type="error" @click="foodCart.clearCart()">Clear Cart</n-button>
                  <n-button type="success" @click="handlePay">PAY</n-button>
                </n-space>
              </n-grid-item>
            </n-grid>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore, useCartStore } from '@/store';
import { useRouterPush } from '@/composables';

defineOptions({ name: 'SettingDrawer' });
const { routerPush } = useRouterPush();
const app = useAppStore();
const foodCart = useCartStore();
const foods = foodCart.items;
const qtys = foodCart.qtys;

const totalPrice = computed(() => {
  const count = foods.reduce((acc, food, index) => {
    if (food.price) return acc + food.price * qtys[index];
    return acc;
  }, 0);
  return count;
});
const handlePositiveClick = () => {
  window.$message?.success('Submit');
  routerPush({ path: '/order' });
  foodCart.clearCart();
};
const handleNegativeClick = () => {
  window.$message?.error('Cancel');
};
const saveAddress = () => {
  window.$message?.success('Save address');
};
const savePayment = () => {
  window.$message?.success('Save payment');
};
const handlePay = () => {
  app.closeSettingDrawer();
  if (foods.length === 0) {
    window.$message?.error('Please add food to cart first!');
    return;
  }

  window.$dialog?.create({
    title: 'Dialog',
    content: 'Are you sure?',
    negativeText: 'Cancel',
    positiveText: 'Submit',
    onPositiveClick: handlePositiveClick,
    onNegativeClick: handleNegativeClick
  });
};
</script>

<style scoped></style>
