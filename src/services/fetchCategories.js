export default async function fetchFoodCategories() {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  ).then((resp) => resp.json()).catch(() => global.alert('Error category food'));
  //   if (response.meals === null || response === undefined) {
  //     global.alert('Error category food');
  //     return null;
  //   }
  return response.meals;
}

export async function fetchDrinkCategories() {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  ).then((resp) => resp.json()).catch(() => global.alert('Error category drink'));
  //   if (response.drinks === null || response === undefined) {
  //     global.alert('Error category drink');
  //     return null;
  //   }
  return response.drinks;
}

export const handleFoodsFilter = async ({ target }) => {
  const param = target.textContent;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`,
  ).then((resp) => resp.json()).catch(() => global.alert(alertError));
    // if (response.meals === null || response === undefined) {
    //   global.alert(alertError);
    //   return null;
    // }
  return response.meals;
};

export const handleDrinksFilter = async ({ target }) => {
  const param = target.name;
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}`,
  ).then((resp) => resp.json()).catch(() => global.alert(alertError));
    // if (response.drinks === null || response === undefined) {
    //   global.alert(alertError);
    //   return null;
    // }
  return response.drinks;
};
