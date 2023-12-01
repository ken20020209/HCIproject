const restaurant: AuthRoute.Route = {
  name: 'restaurant',
  path: '/restaurant',
  component: 'self',
  meta: {
    title: 'restaurant',
    singleLayout: 'basic',
    icon: 'mdi:restaurant',
    requiresAuth: true,
    permissions: ['super', 'customer'],
    order: 0
  }
};

export default restaurant;
