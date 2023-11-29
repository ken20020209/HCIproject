import { adapter } from '@/utils';
import { mockRequest } from '../request';
import { adapterOfFetchRestaurantList } from './restaurant.adapter';

/** 获取用户列表 */
export const fetchRestaurantList = async () => {
  const data = await mockRequest.post<ApiRestaurantManagement.Restaurant[] | null>('/getAllRestaurantList');

  return adapter(adapterOfFetchRestaurantList, data);
};
