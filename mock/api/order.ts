import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

const apis: MockMethod[] = [
  {
    url: '/mock/getAllOrderList',
    method: 'post',
    response: (): Service.MockServiceResult<ApiOrderManagement.Order[]> => {
      const data = mock({
        'list|30': [
          {
            id: '@id',
            customerName: '@name',

            totalPrice: '@integer(1, 100)',
            address: '@county(true)',
            phone: '@integer(00000000, 99999999)',
            'description|1': ['NA', 'no onion', 'no salt', 'no pepper'],
            'status|1': ['1', '2', '3', '4', '5'],
            time: '@datetime'
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
