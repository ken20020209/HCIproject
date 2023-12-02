import type { RouteComponent } from 'vue-router';

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  403: () => import('./_builtin/403/index.vue'),
  404: () => import('./_builtin/404/index.vue'),
  500: () => import('./_builtin/500/index.vue'),
  'constant-page': () => import('./_builtin/constant-page/index.vue'),
  login: () => import('./_builtin/login/index.vue'),
  'not-found': () => import('./_builtin/not-found/index.vue'),
  checkout: () => import('./checkout/index.vue'),
  customer: () => import('./customer/index.vue'),
  customer_restaurant: () => import('./customer/restaurant/index.vue'),
  menu: () => import('./menu/index.vue'),
  order: () => import('./order/index.vue'),
  restaurant: () => import('./restaurant/index.vue'),
  userManagement: () => import('./userManagement/index.vue')
};
