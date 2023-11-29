const userManagement: AuthRoute.Route = {
  name: 'userManagement',
  path: '/userManagement',
  component: 'self',
  meta: {
    title: 'User Management',
    // i18nTitle: 'routes.about',
    requiresAuth: true,
    keepAlive: true,
    singleLayout: 'basic',
    icon: 'mdi:account-card-outline',
    order: 10
  }
};

export default userManagement;
