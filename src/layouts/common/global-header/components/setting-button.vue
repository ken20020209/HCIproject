<template>
  <hover-container
    class="w-40px h-full"
    tooltip-content="Cart"
    :inverted="theme.header.inverted"
    @click="app.toggleSettingDrawerVisible"
  >
    <icon-mdi-cart class="text-20px" />
  </hover-container>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store';

defineOptions({ name: 'SettingButton' });

const app = useAppStore();
const theme = useThemeStore();
</script>

<style scoped></style>
