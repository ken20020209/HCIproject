<template>
  <div>
    <n-space>
      <div class="h-full">
        <n-card>
          <n-carousel :space-between="30" :loop="false" slides-per-view="auto" centered-slides draggable>
            <n-carousel-item style="width: 30%">
              <img
                class="carousel-img"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
              />
            </n-carousel-item>
            <n-carousel-item style="width: 30%">
              <img
                class="carousel-img"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
              />
            </n-carousel-item>
            <n-carousel-item style="width: 30%">
              <img
                class="carousel-img"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
              />
            </n-carousel-item>
            <n-carousel-item style="width: 30%">
              <img
                class="carousel-img"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
              />
            </n-carousel-item>
          </n-carousel>
        </n-card>
      </div>
    </n-space>

    <div class="h-full">
      <n-grid :x-gap="16" :y-gap="16" cols="2 s:3 m:4 l:6 xl:8 2xl:10" responsive="screen">
        <n-grid-item v-for="row in restaurant" :key="row.key">
          <n-space>
            <n-card :title="row.name">
              <n-space>
                <n-image :src="row.image"></n-image>
              </n-space>
              <n-space justify="center">
                <n-statistic :value="3.5">
                  <template #suffix>/ 5</template>
                </n-statistic>
              </n-space>
              <n-space justify="center"><n-button :on-click="openDetail">Detail</n-button></n-space>
            </n-card>
          </n-space>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoadingBar } from 'naive-ui';
import { fetchRestaurantList } from '@/service';
import { useRouterPush } from '@/composables';

const loadingBar = useLoadingBar();

const restaurant = ref<RestaurantManagement.Restaurant[]>([]);
const { routerPush } = useRouterPush();

async function fetchRestaurant() {
  loadingBar.start();
  const { data } = await fetchRestaurantList();
  if (data) {
    setTimeout(() => {
      restaurant.value = data;
      loadingBar.finish();
    }, 1000);
  }
}

const openDetail = () => {
  // window.$message?.info('detail');
  routerPush({ path: '/menu' });
};

// onMounted(() => {
//   fetchRestaurant();
// });

fetchRestaurant();
</script>

<style scoped>
.carousel-img {
  margin: 0 auto;

  height: 100%;
  object-fit: cover;
}
</style>
