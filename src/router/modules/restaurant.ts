const restaurant: AuthRoute.Route = {
  name: 'restaurant',
  path: '/restaurant',
  component: 'basic',
  children: [],
  meta: {
    title: 'restaurant',
    icon: 'mdi:monitor-dashboard',
    permissions: ['restaurant', 'super'],
    order: 1
    // i18nTitle: 'routes.dashboard._value'
  }
};

export default restaurant;
