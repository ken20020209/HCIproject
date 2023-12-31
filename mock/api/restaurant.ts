import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

const apis: MockMethod[] = [
  {
    url: '/mock/getAllRestaurantList',
    method: 'post',
    response: (): Service.MockServiceResult<ApiFoodManagement.Food[]> => {
      const data = mock({
        'list|50': [
          {
            id: '@id',
            name: '@name',
            address: '@county(true)',
            phone: '@integer(10000000000, 19999999999)',
            // image: '@image(200x200)',
            'image|1': [
              '/food/kp.png',
              '/food/malai-kofta.png',
              '/food/tsr.png',
              '/food/veg-sandwich.png',
              '/food/missal-pav.png'
            ],
            description: '@paragraph(1, 3)'
          }
        ]
      });

      return {
        code: 200,
        message: 'ok',
        data: data.list
      };
    }
  }
];

export default apis;
