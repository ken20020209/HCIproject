const restaurant: AuthRoute.Route = {
  name: 'restaurant',
  path: '/restaurant',
  component: 'self',
  meta: {
    title: 'restaurant',
    // permissions: ['restaurant', 'super'],
    singleLayout: 'basic',
    icon: 'mdi:restaurant'
  }
};

export default restaurant;
