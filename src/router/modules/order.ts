const order: AuthRoute.Route = {
  name: 'order',
  path: '/order',
  component: 'self',
  meta: {
    title: 'Order',
    // i18nTitle: 'routes.about',
    requiresAuth: true,
    keepAlive: true,
    singleLayout: 'basic',
    icon: 'mdi:order-bool-descending-variant',
    order: 10
  }
};

export default order;
