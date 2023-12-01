import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as FoodManagement.Food[],
    qtys: [] as number[]
    // total: 0
  }),
  getters: {
    total(): number {
      return this.items.reduce((total, item, index) => {
        if (item.price) return total + item.price * this.qtys[index];
        return total;
      }, 0);
    }
  },
  actions: {
    addItem(item: FoodManagement.Food, qty: number = 1) {
      const index = this.items.findIndex(food => food.id === item.id);
      if (index !== -1) {
        this.qtys[index] += qty;
        if (this.qtys[index] > 10) {
          this.qtys[index] = 10;
        }
        return;
      }
      this.items.push(item);
      this.qtys.push(qty);
    },
    removeItem(index: number) {
      this.items.splice(index, 1);
      this.qtys.splice(index, 1);
    },
    clearCart() {
      const length = this.items.length;
      for (let i = 0; i < length; i += 1) {
        this.items.pop();
        this.qtys.pop();
      }
      // this.total = 0;
    }
  }
});
