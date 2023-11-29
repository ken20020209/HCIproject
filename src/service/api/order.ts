import { adapter } from '@/utils';
import { mockRequest } from '../request';
import { adapterOfFetchOrderList } from './order.adapter';

/** 获取用户列表 */
export const fetchOrderList = async () => {
  const data = await mockRequest.post<ApiOrderManagement.Order[] | null>('/getAllOrderList');

  return adapter(adapterOfFetchOrderList, data);
};
