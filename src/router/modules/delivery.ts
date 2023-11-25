const delivery: AuthRoute.Route = {
  name: 'delivery',
  path: '/delivery',
  component: 'basic',
  children: [],
  meta: {
    title: 'delivery',
    icon: 'mdi:monitor-dashboard',
    permissions: ['delivery', 'super'],
    order: 1
    // i18nTitle: 'routes.dashboard._value'
  }
};

export default delivery;
