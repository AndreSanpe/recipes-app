export async function fromFoodIngredient(param) {
  try {
    const { meals } = await fetch(
      `https:www.themealdb.com/api/json/v1/1/filter.php?i=${param}`,
    ).then((response) => response.json());
    console.log(meals);
    return meals;
  } catch (e) {
    console.log(e);
  }
}

export async function fromFoods(param) {
  try {
    const { meals } = await fetch(
      `https:www.themealdb.com/api/json/v1/1/search.php?s=${param}`,
    ).then((response) => response.json());
    console.log(meals);
    return meals;
  } catch (e) {
    console.log(e);
  }
}

export async function fromDrinkIngredient(param) {
  try {
    const { drinks } = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`,
    ).then((response) => response.json());
    console.log(drinks);
    return drinks;
  } catch (e) {
    console.log(e);
  }
}

export async function fromDrinks(param) {
  try {
    const { drinks } = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param}`,
    ).then((response) => response.json());
    console.log(drinks);
    return drinks;
  } catch (e) {
    console.log(e);
  }
}
