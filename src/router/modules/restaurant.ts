// const restaurant: AuthRoute.Route = {
//   name: 'restaurant',
//   path: '/restaurant',
//   component: 'basic',
//   children: [
//     {
//       name: 'restaurant_menu',
//       path: '/restaurant/menu',
//       component: 'self',
//       meta: {
//         title: 'menu',
//         icon: 'mdi:menu',
//         permissions: ['restaurant', 'super'],
//         // i18nTitle: 'routes.dashboard._value'

//         requiresAuth: true
//       }
//     },
//     {
//       name: 'restaurant_order',
//       path: '/restaurant/order',
//       component: 'self',
//       meta: {
//         title: 'order',
//         icon: 'mdi:order-bool-descending-variant',
//         requiresAuth: true,
//         permissions: ['restaurant', 'super']
//         // i18nTitle: 'routes.dashboard._value'
//       }
//     }
//   ],
//   meta: {
//     title: 'restaurant',
//     icon: 'mdi:restaurant',
//     permissions: ['restaurant', 'super'],
//     order: 1
//     // i18nTitle: 'routes.dashboard._value'
//     // singleLayout: 'basic'
//   }
// };

// export default restaurant;

const restaurant: AuthRoute.Route = {
  name: 'restaurant',
  path: '/restaurant',
  component: 'self',
  meta: {
    title: 'restaurant',
    // i18nTitle: 'routes.about',
    requiresAuth: true,
    keepAlive: true,
    singleLayout: 'basic',
    icon: 'mdi:restaurant',
    order: 1
  }
};

export default restaurant;
