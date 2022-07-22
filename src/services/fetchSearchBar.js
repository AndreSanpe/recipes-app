const alertError = 'Sorry, we haven\'t found any recipes for these filters.';
export async function fromFoodIngredient(param) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`,
  ).then((resp) => resp.json()).catch(() => global.alert(alertError));
  if (response.meals === null || response === undefined) {
    global.alert(alertError);
    return null;
  }
  return response.meals;
}

export async function fromFoodsName(param) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`,
  ).then((resp) => resp.json()).catch(() => global.alert(alertError));
  if (response.meals === null || response === undefined) {
    global.alert(alertError);
    return null;
  }
  return response.meals;
}

export async function fromFoodsFirstLetter(param) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${param}`,
  ).then((resp) => resp.json()).catch(() => global.alert(alertError));
  if (response.meals === null || response === undefined) {
    global.alert(alertError);
    return null;
  }
  return response.meals;
}

export async function fromDrinkIngredient(param) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`,
  ).then((resp) => resp.json()).catch(() => global.alert(alertError));
  if (response.drinks === null || response === undefined) {
    global.alert(alertError);
    return null;
  }
  return response.drinks;
}

export async function fromDrinksName(param) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param}`,
  ).then((resp) => resp.json()).catch(() => global.alert(alertError));
  if (response.drinks === null || response === undefined) {
    global.alert(alertError);
    return null;
  }
  return response.drinks;
}

export async function fromDrinksFirstLetter(param) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${param}`,
  ).then((resp) => resp.json()).catch(() => global.alert(alertError));
  if (response.drinks === null || response === undefined) {
    global.alert(alertError);
    return null;
  }
  return response.drinks;
}
