import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

const apis: MockMethod[] = [
  {
    url: '/mock/getAllFoodList',
    method: 'post',
    response: (): Service.MockServiceResult<ApiFoodManagement.Food[]> => {
      const data = mock({
        'list|1000': [
          {
            id: '@id',
            name: '@name',
            price: '@integer(1, 100)',
            image: '@image(200x200)',
            description: '@paragraph(1, 3)',
            'status|1': ['1', '2', '3']
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
