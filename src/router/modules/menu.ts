const order: AuthRoute.Route = {
  name: 'menu',
  path: '/menu',
  component: 'self',
  meta: {
    title: 'menu',
    icon: 'mdi:menu',
    singleLayout: 'basic',
    permissions: ['restaurant', 'super', 'customer'],
    // i18nTitle: 'routes.dashboard._value'

    requiresAuth: true
  }
};
export default order;
// import { usePermission } from '@/composables';
// const { hasPermission } = usePermission();

// if (hasPermission('customer')) {
//   order.meta.hide = true;
// }
