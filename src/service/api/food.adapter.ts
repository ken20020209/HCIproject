export function adapterOfFetchFoodList(data: ApiFoodManagement.Food[] | null): FoodManagement.Food[] {
  if (!data) return [];

  return data.map((item, index) => {
    const food: FoodManagement.Food = {
      index: index + 1,
      key: item.id,
      ...item
    };

    return food;
  });
}
