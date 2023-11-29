// import type { OrderManagement } from '~/src/typings/business';

export function adapterOfFetchOrderList(data: ApiOrderManagement.Order[] | null): OrderManagement.Order[] {
  if (!data) return [];

  return data.map((item, index) => {
    const order: OrderManagement.Order = {
      index: index + 1,
      key: item.id,
      ...item
    };

    return order;
  });
}
