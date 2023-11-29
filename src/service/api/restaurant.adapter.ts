// import type { RestaurantManagement } from '~/src/typings/business';

export function adapterOfFetchRestaurantList(
  data: ApiRestaurantManagement.Restaurant[] | null
): RestaurantManagement.Restaurant[] {
  if (!data) return [];

  return data.map((item, index) => {
    const food: RestaurantManagement.Restaurant = {
      index: index + 1,
      key: item.id,
      ...item
    };

    return food;
  });
}
