import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App'

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

const mockRecomendedDrinks = {
  drinks:
    [{
      idDrink: "15997",
      strDrink: "GG",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",

    },
    {
      idDrink: "17222",
      strDrink: "A1",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
    },
    {
      idDrink: "13501",
      strDrink: "ABC",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg",
    },
    {
      idDrink: "17203",
      strDrink: "Kir",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg",
    },
    {
      idDrink: "14229",
      strDrink: "747",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg",
    },
    {
      idDrink: "15288",
      strDrink: "252",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg",
    }
    ]
}

const mockRecomendedMeals = {
  meals: [
    {
      idMeal: "52977",
      strMeal: "Corba",
      strMealThumb: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
    },
    {
      idMeal: "53060",
      strMeal: "Burek",
      strMealThumb: "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
    },
    {
      idMeal: "52978",
      strMeal: "Kumpir",
      strMealThumb: "https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
    },
    {
      idMeal: "53026",
      strMeal: "Tamiya",
      strMealThumb: "https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg",
    },
    {
      idMeal: "52785",
      strMeal: "Dal fry",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
    },
    {
      idMeal: "52804",
      strMeal: "Poutine",
      strMealThumb: "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
    }
  ],
}

const mockMeals = {
  meals:
    [{
      idMeal: "52771",
      strMeal: "Spicy Arrabiata Penne",
      strCategory: "Vegetarian",
      strArea: "Italian",
      strInstructions: "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.",
      strMealThumb: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      strTags: "Pasta,Curry",
      strYoutube: "https://www.youtube.com/watch?v=1IszT_guI08",
      strIngredient1: "penne rigate",
      strIngredient2: "olive oil",
      strIngredient3: "garlic",
      strIngredient4: "chopped tomatoes",
      strIngredient5: "red chile flakes",
      strIngredient6: "italian seasoning",
      strIngredient7: "basil",
      strIngredient8: "Parmigiano-Reggiano",
      strIngredient9: "",
      strIngredient10: "",
      strIngredient11: "",
      strIngredient12: "",
      strIngredient13: "",
      strIngredient14: "",
      strIngredient15: "",
      strIngredient16: null,
      strIngredient17: null,
      strIngredient18: null,
      strIngredient19: null,
      strIngredient20: null,
      strMeasure1: "1 pound",
      strMeasure2: "1/4 cup",
      strMeasure3: "3 cloves",
      strMeasure4: "1 tin ",
      strMeasure5: "1/2 teaspoon",
      strMeasure6: "1/2 teaspoon",
      strMeasure7: "6 leaves",
      strMeasure8: "spinkling",
      strMeasure9: "",
      strMeasure10: "",
      strMeasure11: "",
      strMeasure12: "",
      strMeasure13: "",
      strMeasure14: "",
      strMeasure15: "",
      strMeasure16: null,
      strMeasure17: null,
      strMeasure18: null,
      strMeasure19: null,
      strMeasure20: null,
    }]
}

const mockDrinks = {
  drinks:
    [{
      idDrink: "178319",
      strDrink: "Aquamarine",
      strTagsS: null,
      strCategory: "Cocktail",
      strAlcoholic: "Alcoholic",
      strGlass: "Martini Glass",
      strInstructions: "Shake well in a shaker with ice.\r\nStrain in a martini glass.",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
      strIngredient1: "Hpnotiq",
      strIngredient2: "Pineapple Juice",
      strIngredient3: "Banana Liqueur",
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: "2 oz",
      strMeasure2: "1 oz",
      strMeasure3: "1 oz",
      strMeasure4: "",
      strMeasure5: "",
      strMeasure6: "",
      strMeasure7: "",
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
    }]
}

describe('Testa a página de detalhes das receitas', () => {

  beforeEach(() => {
    const { history } = renderWithRouter(<App />)
    history.push('foods/52771')

    delete window.location
    window.location = new URL('http://localhost:3000/foods/52771');

    global.fetch = jest.fn((endpoint) =>
      Promise.resolve({
        json: () => {
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
            return Promise.resolve(mockMeals);
          }
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
            return Promise.resolve(mockDrinks);
          }
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
            return Promise.resolve(mockRecomendedDrinks);
          }
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
            return Promise.resolve(mockRecomendedMeals);
          }
        }
      }));
  });

  it('Testa com a receita "spicy arrabiata penne"', async () => {
    await new Promise((r) => setTimeout(r, 500));

    // testa título da receitascreen.
    const elTitle = await screen.findByRole('heading', { name: /arrabiata/i });
    expect(elTitle).toBeInTheDocument();

    // testa "category" da receita
    const elCategory = screen.getByRole('heading', { name: /vegetarian/i });
    expect(elCategory).toBeInTheDocument();

    // // testa se o vídeo está na tela com o título certo
    const video = screen.getByTitle(/spicy arrabiata penne/i);
    expect(video).toBeInTheDocument();

    // // testa se uma lista de ingredientes está na tela
    const listIng = screen.getAllByRole('list');
    expect(listIng).toHaveLength(1);

    // // testa imagens carroussel + imagem capa receita
    const imageList = screen.getAllByRole('img');
    expect(imageList).toHaveLength(8);

    // // testa botão share
    const shareBtn = screen.getByTestId("share-btn");
    expect(shareBtn).toBeInTheDocument();

    // userEvent.click(shareBtn);
    // const linkCopied = await screen.findByRole('button', { name: /link copied!/i })
    // expect(linkCopied).toBeInTheDocument();

    // testa botão favoritar
    const favoriteBtn = screen.getByTestId("favorite-btn");
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn.getAttribute('src')).toContain('whiteHeartIcon'); // https://stackoverflow.com/questions/41070895/how-do-i-get-an-attribute-of-an-element-nested-in-a-react-component-using-jest-a

    // favorita a receita
    userEvent.click(favoriteBtn);
    expect(favoriteBtn.getAttribute('src')).toContain('blackHeartIcon'); // https://stackoverflow.com/questions/41070895/how-do-i-get-an-attribute-of-an-element-nested-in-a-react-component-using-jest-a

    // espera que no localStorage contenha a receita favoritada 
    const favoriteListLocalStorage = localStorage.getItem('favoriteRecipes');
    expect(favoriteListLocalStorage).toContain("[{\"id\":\"52771\",\"type\":\"food\",\"nationality\":\"Italian\",\"category\":\"Vegetarian\",\"alcoholicOrNot\":\"\",\"name\":\"Spicy Arrabiata Penne\",\"image\":\"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg\"}]");

    // DESfavorita a receita
    userEvent.click(favoriteBtn);
    expect(favoriteBtn.getAttribute('src')).toContain('whiteHeartIcon'); // https://stackoverflow.com/questions/41070895/how-do-i-get-an-attribute-of-an-element-nested-in-a-react-component-using-jest-a
    const favoriteListUpdatedLocalStorage = localStorage.getItem('favoriteRecipes');
    expect(favoriteListUpdatedLocalStorage).not.toContain("[{\"id\":\"52771\",\"type\":\"food\",\"nationality\":\"Italian\",\"category\":\"Vegetarian\",\"alcoholicOrNot\":\"\",\"name\":\"Spicy Arrabiata Penne\",\"image\":\"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg\"}]");

    // testa se ao clicar no botão start ele muda a rota
    const startRecipeBtn = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeBtn).toBeInTheDocument();
    // userEvent.click(startRecipeBtn);
    // expect(history.location.pathname).toContain('foods/52771/in-progress');
  })

  it('Testa clipboard botão share', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => { },
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText')

    // fonte: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

    const shareIcons = await screen.findByRole('img', {  name: /share/i})
    userEvent.click(shareIcons)

    expect(navigator.clipboard.writeText).toHaveBeenCalled()
  })
})