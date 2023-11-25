import { adapter } from '@/utils';
import { mockRequest } from '../request';
import { adapterOfFetchFoodList } from './food.adapter';

/** 获取用户列表 */
export const fetchFoodList = async () => {
  const data = await mockRequest.post<ApiFoodManagement.Food[] | null>('/getAllFoodList');

  return adapter(adapterOfFetchFoodList, data);
};
