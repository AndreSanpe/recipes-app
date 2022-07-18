// const alertError = 'Sorry, we haven\'t found any recipes for these filters.';
export async function fromFoodIngredient(param) {
  try {
    const { meals } = await fetch(
      `https:www.themealdb.com/api/json/v1/1/filter.php?i=${param}`,
    ).then((response) => response.json());
    // console.log(meals);
    return meals;
  } catch (e) {
    // console.log(e);
    // global.alert(alertError);
  }
}

export async function fromFoodsName(param) {
  try {
    const { meals } = await fetch(
      `https:www.themealdb.com/api/json/v1/1/search.php?s=${param}`,
    ).then((response) => response.json());
    // console.log(meals);
    return meals;
  } catch (e) {
    // console.log(e);
  }
}

export async function fromFoodsFirstLetter(param) {
  try {
    const { meals } = await fetch(
      `https:www.themealdb.com/api/json/v1/1/search.php?f=${param}`,
    ).then((response) => response.json());
    // console.log(meals);
    return meals;
  } catch (e) {
    // console.log(e);
  }
}

export async function fromDrinkIngredient(param) {
  try {
    const { drinks } = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`,
    ).then((response) => response.json());
    // console.log(drinks);
    return drinks;
  } catch (e) {
    // global.alert(alertError);
  }
}

export async function fromDrinksName(param) {
  try {
    const { drinks } = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param}`,
    ).then((response) => response.json());
    // console.log(drinks);
    return drinks;
  } catch (e) {
    // global.alert(alertError);
  }
}

export async function fromDrinksFirstLetter(param) {
  try {
    const { drinks } = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${param}`,
    ).then((response) => response.json());
    // console.log(drinks);
    return drinks;
  } catch (e) {
    // global.alert(alertError);
  }
}
