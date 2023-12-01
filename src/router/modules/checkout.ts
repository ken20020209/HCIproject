const checkout: AuthRoute.Route = {
  name: 'checkout',
  path: '/checkout',
  component: 'self',
  meta: {
    title: 'checkout',
    // permissions: ['restaurant', 'super'],
    singleLayout: 'basic',
    icon: 'mdi:cart',
    keepAlive: false,
    requiresAuth: true,
    hide: true
  }
};

export default checkout;
